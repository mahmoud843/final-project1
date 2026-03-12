from flask import Flask, request, redirect, url_for, session, render_template, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from functools import wraps
import os
from datetime import datetime

# إعداد المسارات
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PUBLIC_DIR = os.path.join(BASE_DIR, '..', 'front-end', 'public')
app = Flask(
    __name__,
    static_folder=os.path.join(PUBLIC_DIR, 'static'),
    template_folder=os.path.join(PUBLIC_DIR, 'templates')
)

# الإعدادات الأساسية
app.config['SECRET_KEY'] = 'super_secret_key_123'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root@localhost/fp'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = os.path.join(PUBLIC_DIR, 'static', 'images')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB

# تهيئة قاعدة البيانات
db = SQLAlchemy(app)

# تهيئة Login Manager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login_page'
login_manager.login_message = 'Please login first'

# ------------------------------------------------------
# نماذج قاعدة البيانات (Models)
# ------------------------------------------------------
# ------------------------------------------------------
# جدول المتابعة (Followers) - علاقة many-to-many
# ------------------------------------------------------
followers = db.Table('followers',
    db.Column('follower_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('followed_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    gender = db.Column(db.String(20))
    programming_level = db.Column(db.String(50))
    profile_image = db.Column(db.String(255), default='default-avatar.png')
    bio = db.Column(db.Text, default="I'm a PAD developer!")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # العلاقات
    posts = db.relationship('Post', backref='author', lazy=True, cascade='all, delete-orphan')
    comments = db.relationship('Comment', backref='author', lazy=True, cascade='all, delete-orphan')
    # نظام المتابعة
    followed = db.relationship(
        'User', secondary=followers,
        primaryjoin=(followers.c.follower_id == id),
        secondaryjoin=(followers.c.followed_id == id),
        backref=db.backref('followers', lazy='dynamic'),
        lazy='dynamic'
    )
    # دالة لتسجيل الدخول (مطلوبة من Flask-Login)
    def is_authenticated(self):
        return True
    
    def is_active(self):
        return True
    
    def is_anonymous(self):
        return False
    
    def get_id(self):
        return str(self.id)
    
    def follow(self, user):
        """متابعة مستخدم"""
        if not self.is_following(user):
            self.followed.append(user)
    
    def unfollow(self, user):
        """إلغاء متابعة مستخدم"""
        if self.is_following(user):
            self.followed.remove(user)
    
    def is_following(self, user):
        """التحقق من متابعة مستخدم"""
        return self.followed.filter(followers.c.followed_id == user.id).count() > 0

class Post(db.Model):
    __tablename__ = 'posts'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_type = db.Column(db.String(50), nullable=False)  # 'question', 'project', 'code'
    title = db.Column(db.String(255))
    description = db.Column(db.Text)
    code_content = db.Column(db.Text)
    css_content = db.Column(db.Text)
    js_content = db.Column(db.Text)
    programming_language = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # العلاقات
    comments = db.relationship('Comment', backref='post', lazy=True, cascade='all, delete-orphan')
    likes = db.relationship('Like', backref='post', lazy=True, cascade='all, delete-orphan')

class Comment(db.Model):
    __tablename__ = 'comments'
    
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    comment_text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Like(db.Model):
    __tablename__ = 'likes'
    
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # منع تكرار الإعجاب
    __table_args__ = (db.UniqueConstraint('post_id', 'user_id', name='unique_like'),)

# ------------------------------------------------------
# User Loader for Flask-Login
# ------------------------------------------------------
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# ------------------------------------------------------
# المسارات (Routes)
# ------------------------------------------------------

@app.route('/')
def index():
    """الصفحة الرئيسية للموقع"""
    if current_user.is_authenticated:
        return redirect(url_for('home_page'))
    return render_template('index3.html')

@app.route('/home')
@login_required
def home_page():
    """الصفحة الرئيسية بعد تسجيل الدخول"""
    # جلب المنشورات من قاعدة البيانات
    posts = Post.query.order_by(Post.created_at.desc()).all()
    return render_template('html.html', posts=posts)

@app.route('/login', methods=['GET', 'POST'])
def login_page():
    """صفحة تسجيل الدخول"""
    if current_user.is_authenticated:
        return redirect(url_for('home_page'))

    if request.method == 'POST':
        email = request.form.get('email', '').strip()
        password = request.form.get('password', '').strip()
        
        if not email or not password:
            return render_template('login.html', message="⚠️ Please fill all fields")
        
        user = User.query.filter_by(email=email).first()
        
        if user and check_password_hash(user.password, password):
            login_user(user)
            session['user_id'] = user.id
            session['username'] = user.username
            flash(f'Welcome back, {user.username}!', 'success')
            return redirect(url_for('home_page'))
        else:
            return render_template('login.html', message="❌ Invalid email or password")
            
    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup_page():
    """صفحة إنشاء حساب جديد"""
    if current_user.is_authenticated:
        return redirect(url_for('home_page'))

    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        email = request.form.get('email', '').strip()
        password = request.form.get('password', '').strip()
        gender = request.form.get('gender', '').strip()
        programming_level = request.form.get('programming', '').strip()
        
        if not username or not email or not password:
            return render_template('signup.html', message="⚠️ Please fill all fields")
        
        if len(password) < 6:
            return render_template('signup.html', message="⚠️ Password must be at least 6 characters")
        
        # التحقق من وجود المستخدم
        existing_user = User.query.filter((User.email == email) | (User.username == username)).first()
        if existing_user:
            return render_template('signup.html', message="⚠️ Email or username already exists")
        
        # إنشاء مستخدم جديد
        hashed_password = generate_password_hash(password)
        new_user = User(
            username=username,
            email=email,
            password=hashed_password,
            gender=gender,
            programming_level=programming_level
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        flash('Account created successfully! Please login.', 'success')
        return redirect(url_for('login_page'))
            
    return render_template('signup.html')

@app.route('/create-project', methods=['GET', 'POST'])
@login_required
def create_project_page():
    """صفحة إنشاء مشروع"""
    if request.method == 'POST':
        # استقبال البيانات من الفورم
        post_type = request.form.get('post_type', 'project')
        title = request.form.get('title', '')
        description = request.form.get('description', '')
        code_content = request.form.get('code_content', '')
        css_content = request.form.get('css_content', '')
        js_content = request.form.get('js_content', '')
        programming_language = request.form.get('programming_language', '')
        
        # إنشاء منشور جديد
        new_post = Post(
            user_id=current_user.id,
            post_type=post_type,
            title=title,
            description=description,
            code_content=code_content,
            css_content=css_content,
            js_content=js_content,
            programming_language=programming_language
        )
        
        db.session.add(new_post)
        db.session.commit()
        
        flash('Project created successfully!', 'success')
        return redirect(url_for('home_page'))
    
    return render_template('create-project.html')

@app.route('/profile')
@login_required
def profile():
    """صفحة الملف الشخصي"""
    projects = Post.query.filter_by(user_id=current_user.id, post_type='project').all()
    
    # عدد المتابعين
    followers_count = current_user.followers.count()
    
    # عدد التحديات اللي اتحلت (labs)
    labs_count = Post.query.filter_by(user_id=current_user.id, post_type='lab').count()
    
    return render_template('profile.html', 
                         user=current_user,
                         projects=projects,
                         followers_count=followers_count,
                         labs_count=labs_count)

@app.route('/profile/<int:user_id>')
@login_required
def view_profile(user_id):
    """مشاهدة ملف شخص آخر"""
    user = User.query.get_or_404(user_id)
    projects = Post.query.filter_by(user_id=user_id, post_type='project').all()
    
    followers_count = user.followers.count()
    is_following = current_user.is_following(user)
    labs_count = Post.query.filter_by(user_id=user_id, post_type='lab').count()
    
    return render_template('profile.html', 
                         user=user,
                         projects=projects,
                         followers_count=followers_count,
                         labs_count=labs_count,
                         is_following=is_following)

@app.route('/api/add-project', methods=['POST'])
@login_required
def add_project():
    """API لإضافة مشروع"""
    data = request.json
    
    new_project = Post(
        user_id=current_user.id,
        post_type='project',
        title=data.get('name'),
        description=data.get('description')
    )
    
    db.session.add(new_project)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'project': {
            'id': new_project.id,
            'name': new_project.title,
            'description': new_project.description
        }
    })

@app.route('/api/delete-project/<int:project_id>', methods=['DELETE'])
@login_required
def delete_project(project_id):
    """API لحذف مشروع"""
    project = Post.query.get_or_404(project_id)
    
    if project.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    db.session.delete(project)
    db.session.commit()
    
    return jsonify({'success': True})

# ==========================================
# APIs نظام المتابعة (Followers)
# ==========================================

@app.route('/api/follow/<int:user_id>', methods=['POST'])
@login_required
def follow_user(user_id):
    """متابعة أو إلغاء متابعة مستخدم"""
    print(f"Follow attempt: user {current_user.id} trying to follow {user_id}")
    
    if user_id == current_user.id:
        return jsonify({'error': 'Cannot follow yourself'}), 400
    
    user_to_follow = User.query.get_or_404(user_id)
    
    if current_user.is_following(user_to_follow):
        current_user.unfollow(user_to_follow)
        followed = False
        print(f"Unfollowed {user_id}")
    else:
        current_user.follow(user_to_follow)
        followed = True
        print(f"Followed {user_id}")
    
    db.session.commit()
    
    return jsonify({
        'success': True,
        'followed': followed,
        'followers_count': user_to_follow.followers.count()
    })

@app.route('/api/followers/<int:user_id>')
@login_required
def get_followers(user_id):
    """جلب قائمة المتابعين لمستخدم معين"""
    user = User.query.get_or_404(user_id)
    followers = user.followers.all()
    
    return jsonify([{
        'id': f.id,
        'username': f.username,
        'profile_image': f.profile_image
    } for f in followers])

@app.route('/api/suggestions')
@login_required
def get_suggestions():
    """اقتراح مستخدمين للمتابعة"""
    users = User.query.filter(User.id != current_user.id).all()
    suggestions = [u for u in users if not current_user.is_following(u)][:5]
    
    return jsonify([{
        'id': u.id,
        'username': u.username,
        'profile_image': u.profile_image
    } for u in suggestions])

# ==========================================
# APIs الإعجابات والتعليقات
# ==========================================

@app.route('/api/like/<int:post_id>', methods=['POST'])
@login_required
def like_post(post_id):
    """إعجاب أو إلغاء إعجاب بمنشور"""
    post = Post.query.get_or_404(post_id)
    
    like = Like.query.filter_by(post_id=post_id, user_id=current_user.id).first()
    
    if like:
        db.session.delete(like)
        liked = False
    else:
        new_like = Like(post_id=post_id, user_id=current_user.id)
        db.session.add(new_like)
        liked = True
    
    db.session.commit()
    
    return jsonify({
        'success': True,
        'liked': liked,
        'likes_count': post.likes.count()
    })

@app.route('/api/comment/<int:post_id>', methods=['POST'])
@login_required
def add_comment(post_id):
    """إضافة تعليق"""
    data = request.json
    comment_text = data.get('comment')
    
    if not comment_text:
        return jsonify({'error': 'Comment cannot be empty'}), 400
    
    new_comment = Comment(
        post_id=post_id,
        user_id=current_user.id,
        comment_text=comment_text
    )
    
    db.session.add(new_comment)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'comment': {
            'id': new_comment.id,
            'username': current_user.username,
            'text': comment_text,
            'created_at': new_comment.created_at.strftime('%Y-%m-%d %H:%M')
        }
    })

@app.route('/api/comments/<int:post_id>')
@login_required
def get_comments(post_id):
    """جلب تعليقات منشور"""
    post = Post.query.get_or_404(post_id)
    comments = post.comments.order_by(Comment.created_at.desc()).all()
    
    return jsonify([{
        'id': c.id,
        'username': c.author.username,
        'text': c.comment_text,
        'created_at': c.created_at.strftime('%Y-%m-%d %H:%M')
    } for c in comments])

@app.route('/api/upload-avatar', methods=['POST'])
@login_required
def upload_avatar():
    """رفع صورة البروفايل"""
    if 'avatar' not in request.files:
        return jsonify({'error': 'No file'}), 400
    
    file = request.files['avatar']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    # حفظ الصورة
    filename = f"avatar_{current_user.id}_{secure_filename(file.filename)}"
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    
    # تحديث قاعدة البيانات
    current_user.profile_image = filename
    db.session.commit()
    
    return jsonify({'success': True, 'filename': filename})

@app.route('/api/update-bio', methods=['POST'])
@login_required
def update_bio():
    """تحديث السيرة الذاتية"""
    data = request.json
    new_bio = data.get('bio', '')
    
    current_user.bio = new_bio
    db.session.commit()
    
    return jsonify({'success': True, 'bio': new_bio})

@app.route('/ai')
@login_required
def ai_page():
    """صفحة الذكاء الاصطناعي"""
    return render_template('Ai.html')

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

@app.route('/logout')
def logout():
    """تسجيل الخروج"""
    logout_user()
    session.clear()
    return redirect(url_for('login_page'))

# مسارات الاستضافة
@app.route('/hosting')
@login_required
def hosting_page():
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

# ------------------------------------------------------
# تهيئة قاعدة البيانات
# ------------------------------------------------------
def init_database():
    with app.app_context():
        db.create_all()
        print("✅ Database initialized successfully!")

if __name__ == "__main__":
    init_database()
    app.run(debug=True, port=5000)
