
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from datetime import datetime

# إنشاء كائن قاعدة البيانات
db = SQLAlchemy()

# ------------------------------------------------------
# نموذج المستخدم (Users)
# ------------------------------------------------------
class User(UserMixin, db.Model):
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
    
    # العلاقات (Relationships)
    posts = db.relationship('Post', backref='author', lazy=True, cascade='all, delete-orphan')
    comments = db.relationship('Comment', backref='author', lazy=True, cascade='all, delete-orphan')
    todos = db.relationship('Todo', backref='user', lazy=True, cascade='all, delete-orphan')
    
    # نظام المتابعة (Followers)
    followers = db.relationship(
        'User', secondary='followers',
        primaryjoin=('followers.c.follower_id == User.id'),
        secondaryjoin=('followers.c.followed_id == User.id'),
        backref=db.backref('following', lazy='dynamic'),
        lazy='dynamic'
    )
    
    def __repr__(self):
        return f'<User {self.username}>'

# ------------------------------------------------------
# نموذج المنشورات (Posts)
# ------------------------------------------------------
class Post(db.Model):
    __tablename__ = 'posts'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_type = db.Column(db.String(50), nullable=False)  # 'question', 'project', 'code'
    title = db.Column(db.String(255))
    description = db.Column(db.Text)
    code_content = db.Column(db.Text)  # للسؤال أو الكود
    css_content = db.Column(db.Text)   # للمشاريع
    js_content = db.Column(db.Text)    # للمشاريع
    programming_language = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # العلاقات
    comments = db.relationship('Comment', backref='post', lazy=True, cascade='all, delete-orphan')
    likes = db.relationship('Like', backref='post', lazy=True, cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<Post {self.title}>'

# ------------------------------------------------------
# نموذج التعليقات (Comments)
# ------------------------------------------------------
class Comment(db.Model):
    __tablename__ = 'comments'
    
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    comment_text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<Comment {self.id}>'

# ------------------------------------------------------
# نموذج الإعجابات (Likes)
# ------------------------------------------------------
class Like(db.Model):
    __tablename__ = 'likes'
    
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # منع تكرار الإعجاب من نفس المستخدم على نفس المنشور
    __table_args__ = (db.UniqueConstraint('post_id', 'user_id', name='unique_like'),)
    
    def __repr__(self):
        return f'<Like {self.id}>'

# ------------------------------------------------------
# نموذج المهام (Todos)
# ------------------------------------------------------
class Todo(db.Model):
    __tablename__ = 'todos'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    task_text = db.Column(db.String(255), nullable=False)
    is_completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<Todo {self.task_text}>'

# ------------------------------------------------------
# جدول المتابعة (Followers) - علاقة many-to-many
# ------------------------------------------------------
followers = db.Table('followers',
    db.Column('follower_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('followed_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)
