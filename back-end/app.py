from flask import Flask, request, redirect, url_for, session, render_template, flash
import mysql.connector
from mysql.connector import Error
import os
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps

# إعداد المسارات بشكل صحيح لربط مجلد back-end بمجلد front-end
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PUBLIC_DIR = os.path.join(BASE_DIR, '../front-end/public')

app = Flask(
    __name__,
    static_folder=os.path.join(PUBLIC_DIR, 'static'),
    template_folder=os.path.join(PUBLIC_DIR, 'templates')
)

app.secret_key = "super_secret_key_123"

# إعدادات قاعدة البيانات
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '', # تأكد إن الباسورد ده نفس اللي عندك في XAMPP أو WAMP
    'database': 'fp'
}

# ---------- الاتصال بقاعدة البيانات ----------
def get_db_connection():
    try:
        conn = mysql.connector.connect(**db_config)
        return conn
    except Error as e:
        print(f"Database connection error: {e}")
        return None

# ---------- التحقق من تسجيل الدخول (Decorator) ----------
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            flash('Please login first', 'warning')
            return redirect(url_for('login_page'))
        return f(*args, **kwargs)
    return decorated_function

# ---------- المسارات (Routes) ----------

@app.route('/')
def index():
    """الصفحة الرئيسية للموقع"""
    # لو المستخدم مسجل دخول، وديه على صفحته، لو لأ، وديه لصفحة البداية
    if 'user_id' in session:
        return redirect(url_for('home_page'))
    return render_template('index3.html')

@app.route('/home')
@login_required
def home_page():
    """الصفحة الرئيسية بعد تسجيل الدخول"""
    return render_template('html.html')

@app.route('/login', methods=['GET', 'POST'])
def login_page():
    """صفحة تسجيل الدخول"""
    if 'user_id' in session:
        return redirect(url_for('home_page'))

    if request.method == 'POST':
        email = request.form.get('email', '').strip()
        password = request.form.get('password', '').strip()
        
        if not email or not password:
            return render_template('login.html', message="⚠️ Please fill all fields")
        
        conn = get_db_connection()
        if not conn:
            return render_template('login.html', message="❌ Database connection error")
        
        cursor = conn.cursor(dictionary=True)
        try:
            cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
            user = cursor.fetchone()
            
            if user and check_password_hash(user['password'], password):
                session['user_id'] = user['id']
                session['username'] = user['username']
                session['email'] = user['email']
                flash(f'Welcome back, {user["username"]}!', 'success')
                return redirect(url_for('home_page'))
            else:
                return render_template('login.html', message="❌ Invalid email or password")
        except Error as e:
            return render_template('login.html', message=f"❌ Database error: {e}")
        finally:
            cursor.close()
            conn.close()
            
    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup_page():
    """صفحة إنشاء حساب جديد"""
    if 'user_id' in session:
        return redirect(url_for('home_page'))

    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        email = request.form.get('email', '').strip()
        password = request.form.get('password', '').strip()
        
        if not username or not email or not password:
            return render_template('signup.html', message="⚠️ Please fill all fields")
        
        if len(password) < 6:
            return render_template('signup.html', message="⚠️ Password must be at least 6 characters")
        
        conn = get_db_connection()
        if not conn:
            return render_template('signup.html', message="❌ Database connection error")
        
        cursor = conn.cursor()
        try:
            cursor.execute("SELECT id FROM users WHERE email = %s OR username = %s", (email, username))
            if cursor.fetchone():
                return render_template('signup.html', message="⚠️ Email or username already exists")
            
            hashed_password = generate_password_hash(password)
            cursor.execute(
                "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)",
                (username, email, hashed_password)
            )
            conn.commit()
            flash('Account created successfully! Please login.', 'success')
            return redirect(url_for('login_page'))
            
        except Error as e:
            return render_template('signup.html', message=f"❌ Database error: {e}")
        finally:
            cursor.close()
            conn.close()
            
    return render_template('signup.html')
@app.route('/create-project')
@login_required
def create_project_page():
    """صفحة إنشاء مشروع"""
    return render_template('create-project.html')

@app.route('/profile')
@login_required
def profile():
    """صفحة الملف الشخصي"""
    conn = get_db_connection()
    if not conn:
        flash('Database connection error', 'error')
        return redirect(url_for('home_page'))
    
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT id, username, email, created_at FROM users WHERE id = %s", (session['user_id'],))
        user = cursor.fetchone()
        return render_template('profile.html', user=user)
    except Error as e:
        flash(f'Error loading profile: {e}', 'error')
        return redirect(url_for('home_page'))
    finally:
        cursor.close()
        conn.close()

@app.route('/ai')
@login_required
def ai_page():
    """صفحة الذكاء الاصطناعي"""
    return render_template('Ai.html')

@app.route('/test-images')
def test_images():
    return render_template('test_images.html')

@app.route('/logout')
def logout():
    """تسجيل الخروج"""
    session.clear()
    return redirect(url_for('login_page'))

# إنشاء الجداول في قاعدة البيانات لو مش موجودة
def init_database():
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.commit()
        cursor.close()
        conn.close()
        print("✅ Database initialized successfully!")
@app.route('/codelab')
@login_required
def codelab_page():
    """صفحة محرر الأكواد (CodeLab)"""
    return render_template('codelab.html')
@app.route('/shop')
@login_required
def shop_page():
    """صفحة المتجر"""
    return render_template('shop.html')
    # ==========================================
# مسارات قسم الاستضافة (Hosting Section)
# ==========================================

@app.route('/hosting')
@login_required
def hosting_page():
    """الصفحة الرئيسية للاستضافة"""
    return render_template('hosting.html')

@app.route('/hosting/about')
@login_required
def about_page():
    return render_template('about.html')

@app.route('/hosting/status')
@login_required
def status_page():
    return render_template('status.html')

@app.route('/hosting/careers')
@login_required
def careers_page():
    return render_template('careers.html')

@app.route('/hosting/contact')
@login_required
def contact_page():
    return render_template('contact.html')

@app.route('/hosting/docs')
@login_required
def docs_page():
    return render_template('docs.html')

@app.route('/hosting/migration')
@login_required
def migration_page():
    return render_template('migration.html')

@app.route('/hosting/blog')
@login_required
def blog_page():
    return render_template('blog.html')

@app.route('/hosting/support')
@login_required
def support_page():
    return render_template('support.html')



if __name__ == "__main__":
    init_database()
    app.run(debug=True, port=5000)
