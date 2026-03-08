// مصفوفة المنتجات (تم تعديل مسارات الصور لتناسب مجلد static في Flask)
const products = [
  {id:1, name:"تعلم Python للمبتدئين", category:"python", price:120, img:"/static/images/python_book.png"},
  {id:2, name:"CSS من الصفر للاحتراف", category:"css", price:80, img:"/static/images/css_book.png"},
  {id:3, name:"JavaScript كامل", category:"javascript", price:150, img:"/static/images/js_book.png"},
  {id:4, name:"HTML & Web Design", category:"html", price:70, img:"/static/images/html_book.png"}
];

let cart = [];

const productsGrid = document.getElementById('productsGrid');
const cartList = document.getElementById('cartList');
const cartCount = document.getElementById('cartCount');
const totalPriceEl = document.getElementById('totalPrice');

// تم تعديل الدالة لتقبل البحث (searchQuery)
function renderProducts(filter = "all", searchQuery = "") {
  productsGrid.innerHTML = '';
  
  // تصفية المنتجات بناءً على الفئة (Category) والبحث (Search)
  let filtered = products;
  
  if (filter !== "all") {
      filtered = filtered.filter(p => p.category === filter);
  }
  
  if (searchQuery !== "") {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery));
  }

  // رسم الكروت
  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = "card";
    // إضافة fallback (onerror) للصورة في حال لم تكن موجودة في مجلد static
    card.innerHTML = `
      <div class="cover">
          <img src="${p.img}" alt="${p.name}" style="width:100%; height:100%; border-radius:16px; object-fit: cover;" onerror="this.src='https://via.placeholder.com/150?text=No+Image'">
      </div>
      <div class="meta" style="margin-top: 10px;">
        <div class="price" style="font-weight: bold; color: #fbbf24;">${p.price} جنيه</div>
        <button class="addBtn" onclick="addToCart(${p.id})">أضف للسلة</button>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

function addToCart(id){
  const item = products.find(p=>p.id===id);
  const exist = cart.find(c=>c.id===id);
  
  if(exist) {
      exist.qty++;
  } else {
      cart.push({...item, qty:1});
  }
  updateCart();
}

function updateCart(){
  cartList.innerHTML='';
  let total = 0;
  
  cart.forEach((c, i) => {
    total += c.price * c.qty;
    const div = document.createElement('div');
    div.className = "cartItem";
    // إضافة تنسيق بسيط مباشر لعنصر السلة ليتناسب مع CSS الذي أرسلته
    div.style.cssText = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; background: rgba(17,24,39,.55); padding: 8px; border-radius: 10px;";
    
    div.innerHTML = `
      <div class="cartLeft" style="display: flex; gap: 10px; align-items: center;">
        <div class="cartTxt">
          <div class="t" style="font-size: 14px;">${c.name}</div>
          <div class="p" style="color: var(--gold); font-weight: bold; font-size: 12px;">${c.price} جنيه</div>
        </div>
      </div>
      <div class="cartControls" style="display: flex; gap: 8px; align-items: center; background: rgba(0,0,0,0.3); padding: 4px 8px; border-radius: 8px;">
        <button onclick="changeQty(${i},-1)" style="background: transparent; border: none; color: white; cursor: pointer; font-size: 16px;">-</button>
        <div class="qty" style="font-weight: bold;">${c.qty}</div>
        <button onclick="changeQty(${i},1)" style="background: transparent; border: none; color: white; cursor: pointer; font-size: 16px;">+</button>
      </div>
    `;
    cartList.appendChild(div);
  });
  
  cartCount.innerText = cart.reduce((sum, item) => sum + item.qty, 0); // عدد العناصر الإجمالي
  totalPriceEl.innerText = total + " جنيه";
}

function changeQty(i, delta){
  cart[i].qty += delta;
  if(cart[i].qty <= 0) cart.splice(i,1);
  updateCart();
}

// مستمع لحدث تغيير الفئة (القسم)
document.getElementById('categorySelect').addEventListener('change', e => {
  const currentSearch = document.getElementById('searchInput').value.toLowerCase();
  renderProducts(e.target.value, currentSearch);
});

// مستمع لحدث البحث المباشر
document.getElementById('searchInput').addEventListener('input', e => {
  const currentCategory = document.getElementById('categorySelect').value;
  renderProducts(currentCategory, e.target.value.toLowerCase());
});

// التشغيل الأولي
renderProducts();
// ==================== INITIAL DATA STRUCTURE ====================
let profileData = {
    // Basic Info
    name: 'Ahmed Mohamed',
    bio: 'Python Developer | Flask Enthusiast',
    field: 'Web Developer',
    joinDate: '2024-01-15',
    image: 'https://via.placeholder.com/150',
    
    // Statistics
    stats: {
        projects: 8,
        followers: 156,
        following: 89,
        questions: 27,
        books: 12,
        labs: 34,
        courses: 5,
        streak: 15,
        aiQuestions: 45,
        hostedSites: 3,
        rank: 52
    },
    
    // Developer Level
    level: {
        current: 'Junior Developer',
        next: 'Advanced',
        progress: 45
    },
    
    // Skills
    skills: [
        { name: 'Python', level: 85 },
        { name: 'Flask', level: 70 },
        { name: 'HTML/CSS', level: 90 },
        { name: 'JavaScript', level: 65 },
        { name: 'SQL', level: 60 }
    ],
    
    // Learning Progress
    courses: [
        { name: 'Python Course', progress: 70 },
        { name: 'Web Development', progress: 40 },
        { name: 'Data Structures', progress: 25 },
        { name: 'Flask Masterclass', progress: 15 }
    ],
    
    // Featured Project
    featured: {
        name: 'Online Code Editor',
        description: 'محرر أكواد تفاعلي يدعم Python, JavaScript, HTML/CSS مع خاصية التشغيل المباشر',
        tech: ['Flask', 'React', 'Docker'],
        demo: '#',
        github: '#',
        image: 'https://via.placeholder.com/300x150'
    },
    
    // Projects
    projects: [
        {
            id: 1,
            name: 'Todo App',
            description: 'تطبيق لإدارة المهام اليومية مع إشعارات وقوائم مخصصة',
            tech: ['Flask', 'SQLite', 'Bootstrap'],
            image: 'https://via.placeholder.com/300x150',
            demo: '#',
            github: '#',
            likes: 23,
            comments: 5,
            views: 156,
            date: '2024-03-15'
        },
        {
            id: 2,
            name: 'Weather App',
            description: 'تطبيق للطقس باستخدام API مع خرائط تفاعلية',
            tech: ['Python', 'Requests', 'JSON', 'API'],
            image: 'https://via.placeholder.com/300x150',
            demo: '#',
            github: '#',
            likes: 15,
            comments: 3,
            views: 98,
            date: '2024-03-10'
        }
    ],
    
    // Books
    books: [
        { title: 'Python for Beginners', author: 'John Doe' },
        { title: 'Flask Web Development', author: 'Miguel Grinberg' },
        { title: 'Data Structures Guide', author: 'Jane Smith' }
    ],
    
    // Lab Activity
    labActivity: {
        completed: 24,
        current: 'Python Loops',
        lastRun: 'منذ ساعتين'
    },
    
    // AI Activity
    aiActivity: {
        questions: 45,
        lastSession: 'منذ ساعة'
    },
    
    // Hosting
    hosting: {
        sites: 3,
        lastDeploy: 'منذ 3 أيام'
    },
    
    // Achievements
    achievements: [
        { id: 1, name: 'أول كود', icon: 'fa-code', unlocked: true },
        { id: 2, name: 'أول كورس', icon: 'fa-graduation-cap', unlocked: true },
        { id: 3, name: '10 Labs', icon: 'fa-flask', unlocked: true },
        { id: 4, name: 'أول مشروع', icon: 'fa-rocket', unlocked: true },
        { id: 5, name: 'Hosting Pro', icon: 'fa-server', unlocked: false },
        { id: 6, name: 'AI Master', icon: 'fa-robot', unlocked: false }
    ],
    
    // Community Posts
    posts: [
        { author: 'Ahmed', content: 'Just finished my first Python project! 🐍', likes: 5, comments: [], liked: false },
        { author: 'Ahmed', content: 'Any tips to learn web development faster? 💻', likes: 3, comments: [], liked: false }
    ],
    
    // Activity Timeline
    timeline: [
        { time: 'منذ ساعتين', action: 'أكمل Lab: Python Loops' },
        { time: 'منذ 5 ساعات', action: 'أضاف مشروع جديد: Todo App' },
        { time: 'أمس', action: 'سأل AI عن Flask' },
        { time: 'منذ يومين', action: 'اشترى كتاب: Flask Web Development' }
    ],
    
    // Portfolio Links
    portfolio: {
        github: 'https://github.com/username',
        linkedin: 'https://linkedin.com/in/username',
        website: 'https://username.dev'
    },
    
    // Saved Projects
    savedProjects: [
        { name: 'E-commerce Platform', author: 'Mohamed Ali' },
        { name: 'Chat Application', author: 'Sara Ahmed' }
    ]
};

// ==================== UTILITY FUNCTIONS ====================
function saveToStorage() {
    localStorage.setItem('profileData', JSON.stringify(profileData));
}

function loadFromStorage() {
    const saved = localStorage.getItem('profileData');
    if (saved) {
        profileData = JSON.parse(saved);
    }
}

function showNotification(message, type = 'success') {
    alert(message);
}

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", function() {
    loadFromStorage();
    
    // ==================== DOM ELEMENTS ====================
    const elements = {
        profileName: document.getElementById('profile-name'),
        profileBio: document.getElementById('profile-bio'),
        profileField: document.getElementById('profile-field'),
        joinDate: document.getElementById('join-date'),
        profileImg: document.getElementById('profile-img'),
        
        // Stats
        projectsCount: document.getElementById('projects-count'),
        followersCount: document.getElementById('followers-count'),
        followingCount: document.getElementById('following-count'),
        questionsCount: document.getElementById('questions-count'),
        booksCount: document.getElementById('books-count'),
        labsCount: document.getElementById('labs-count'),
        coursesCount: document.getElementById('courses-count'),
        streakDays: document.getElementById('streak-days'),
        userRank: document.getElementById('user-rank'),
        
        // Level
        devLevel: document.getElementById('dev-level'),
        nextLevel: document.getElementById('next-level'),
        levelProgress: document.getElementById('level-progress'),
        
        // Lab
        labsCompleted: document.getElementById('labs-completed'),
        currentLab: document.getElementById('current-lab'),
        lastRun: document.getElementById('last-run'),
        
        // AI
        aiQuestions: document.getElementById('ai-questions'),
        lastAiSession: document.getElementById('last-ai-session'),
        
        // Hosting
        hostedSites: document.getElementById('hosted-sites'),
        lastDeploy: document.getElementById('last-deploy'),
        
        // Containers
        skillsContainer: document.getElementById('skills-container'),
        progressList: document.getElementById('progress-list'),
        projectsContainer: document.getElementById('projects-container'),
        booksList: document.getElementById('books-list'),
        badgesContainer: document.getElementById('badges-container'),
        communityPosts: document.getElementById('community-posts'),
        questionsContainer: document.getElementById('questions-container'),
        timeline: document.getElementById('timeline'),
        portfolioLinks: document.getElementById('portfolio-links'),
        savedProjects: document.getElementById('saved-projects'),
        featuredProject: document.getElementById('featured-project'),
        
        // Buttons
        themeToggle: document.getElementById('theme-toggle'),
        themeIcon: document.querySelector('#theme-toggle i'),
        addSkillBtn: document.getElementById('add-skill'),
        skillSearch: document.getElementById('skill-search'),
        showAddProjectBtn: document.getElementById('show-add-project'),
        addProjectForm: document.getElementById('add-project-form'),
        cancelAddProject: document.getElementById('cancel-add-project'),
        uploadProjectBtn: document.getElementById('upload-project'),
        projectName: document.getElementById('project-name'),
        projectDesc: document.getElementById('project-desc'),
        projectTech: document.getElementById('project-tech'),
        projectDemo: document.getElementById('project-demo'),
        projectGithub: document.getElementById('project-github'),
        projectImage: document.getElementById('project-image'),
        fileName: document.getElementById('file-name'),
        editProfileBtn: document.getElementById('edit-profile-btn'),
        editImgBtn: document.getElementById('edit-img-btn'),
        editFeatured: document.getElementById('edit-featured'),
        editPortfolio: document.getElementById('edit-portfolio'),
        followBtn: document.getElementById('follow-btn')
    };

    // ==================== THEME MANAGEMENT ====================
    let currentTheme = localStorage.getItem('theme') || 'light';
    
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        elements.themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        currentTheme = theme;
        localStorage.setItem('theme', theme);
    }

    elements.themeToggle.addEventListener('click', () => {
        setTheme(currentTheme === 'light' ? 'dark' : 'light');
    });

    setTheme(currentTheme);

    // ==================== PROFILE MANAGEMENT ====================
    function updateProfileDisplay() {
        elements.profileName.textContent = profileData.name;
        elements.profileBio.textContent = profileData.bio;
        elements.profileField.innerHTML = `<i class="fas fa-code"></i> ${profileData.field}`;
        
        const joinDateObj = new Date(profileData.joinDate);
        const months = ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
        const joinDateStr = `${months[joinDateObj.getMonth()]} ${joinDateObj.getFullYear()}`;
        elements.joinDate.innerHTML = `<i class="far fa-calendar-alt"></i> انضم في: ${joinDateStr}`;
        
        elements.profileImg.src = profileData.image;
    }

    elements.editProfileBtn.addEventListener('click', () => {
        const newName = prompt('Enter your name:', profileData.name);
        if (newName && newName.trim() !== '') {
            profileData.name = newName.trim();
        }
        
        const newBio = prompt('Enter your bio:', profileData.bio);
        if (newBio !== null) {
            profileData.bio = newBio.trim() || profileData.bio;
        }
        
        const newField = prompt('Enter your field:', profileData.field);
        if (newField !== null) {
            profileData.field = newField.trim() || profileData.field;
        }
        
        updateProfileDisplay();
        saveToStorage();
    });

    elements.editImgBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    profileData.image = event.target.result;
                    updateProfileDisplay();
                    saveToStorage();
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    });

    // Follow button
    let isFollowing = false;
    elements.followBtn.addEventListener('click', function() {
        isFollowing = !isFollowing;
        if (isFollowing) {
            this.classList.add('following');
            this.innerHTML = '<i class="fas fa-user-check"></i> متابعة';
            profileData.stats.followers++;
        } else {
            this.classList.remove('following');
            this.innerHTML = '<i class="fas fa-user-plus"></i> متابعة';
            profileData.stats.followers--;
        }
        updateStatistics();
        saveToStorage();
    });

    // ==================== STATISTICS UPDATE ====================
    function updateStatistics() {
        elements.projectsCount.textContent = profileData.stats.projects;
        elements.followersCount.textContent = profileData.stats.followers;
        elements.followingCount.textContent = profileData.stats.following;
        elements.questionsCount.textContent = profileData.stats.questions;
        elements.booksCount.textContent = profileData.stats.books;
        elements.labsCount.textContent = profileData.stats.labs;
        elements.coursesCount.textContent = profileData.stats.courses;
        elements.streakDays.textContent = profileData.stats.streak;
        elements.userRank.textContent = `#${profileData.stats.rank}`;
        
        // Level
        elements.devLevel.textContent = profileData.level.current;
        elements.nextLevel.textContent = `المستوى التالي: ${profileData.level.next}`;
        elements.levelProgress.style.width = `${profileData.level.progress}%`;
        
        // Lab
        elements.labsCompleted.textContent = profileData.labActivity.completed;
        elements.currentLab.textContent = profileData.labActivity.current;
        elements.lastRun.textContent = profileData.labActivity.lastRun;
        
        // AI
        elements.aiQuestions.textContent = profileData.aiActivity.questions;
        elements.lastAiSession.textContent = profileData.aiActivity.lastSession;
        
        // Hosting
        elements.hostedSites.textContent = profileData.hosting.sites;
        elements.lastDeploy.textContent = profileData.hosting.lastDeploy;
        
        document.getElementById('total-projects').textContent = profileData.projects.length;
        document.getElementById('total-books').textContent = profileData.books.length;
    }

    // ==================== SKILLS MANAGEMENT ====================
    function renderSkills() {
        elements.skillsContainer.innerHTML = '';
        profileData.skills.forEach(skill => {
            const skillBar = document.createElement('div');
            skillBar.className = 'skill-bar';
            skillBar.innerHTML = `<div class="skill-bar-fill" style="width: 0%">${skill.name} ${skill.level}%</div>`;
            elements.skillsContainer.appendChild(skillBar);
            
            setTimeout(() => {
                const fill = skillBar.querySelector('.skill-bar-fill');
                fill.style.width = skill.level + '%';
            }, 100);
        });
    }

    elements.addSkillBtn.addEventListener('click', () => {
        const skillName = prompt('Enter skill name:');
        if (!skillName) return;
        
        const skillLevel = prompt('Enter skill level (0-100):');
        if (skillLevel === null || isNaN(skillLevel) || skillLevel < 0 || skillLevel > 100) {
            alert('Please enter a valid number between 0 and 100');
            return;
        }
        
        profileData.skills.push({ name: skillName, level: parseInt(skillLevel) });
        renderSkills();
        saveToStorage();
    });

    elements.skillSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredSkills = profileData.skills.filter(skill => 
            skill.name.toLowerCase().includes(searchTerm)
        );
        
        elements.skillsContainer.innerHTML = '';
        filteredSkills.forEach(skill => {
            const skillBar = document.createElement('div');
            skillBar.className = 'skill-bar';
            skillBar.innerHTML = `<div class="skill-bar-fill" style="width: ${skill.level}%">${skill.name} ${skill.level}%</div>`;
            elements.skillsContainer.appendChild(skillBar);
        });
    });

    // ==================== LEARNING PROGRESS ====================
    function renderLearningProgress() {
        elements.progressList.innerHTML = '';
        
        profileData.courses.forEach(course => {
            const item = document.createElement('div');
            item.className = 'progress-item';
            item.innerHTML = `
                <div class="progress-header">
                    <span>${course.name}</span>
                    <span>${course.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div style="width: ${course.progress}%"></div>
                </div>
            `;
            elements.progressList.appendChild(item);
        });
    }

    // ==================== FEATURED PROJECT ====================
    function renderFeatured() {
        const featured = profileData.featured;
        elements.featuredProject.innerHTML = `
            <div class="featured-content">
                <h3>${featured.name}</h3>
                <p>${featured.description}</p>
                <div class="tech-stack">
                    ${featured.tech.map(t => `<span>${t}</span>`).join('')}
                </div>
                <div class="featured-links">
                    <a href="${featured.demo}" class="demo-link" target="_blank"><i class="fas fa-external-link-alt"></i> Demo</a>
                    <a href="${featured.github}" class="github-link" target="_blank"><i class="fab fa-github"></i> Source</a>
                </div>
            </div>
            <img src="${featured.image}" alt="Featured Project" class="featured-img">
        `;
    }

    elements.editFeatured.addEventListener('click', () => {
        const newName = prompt('Enter featured project name:', profileData.featured.name);
        if (newName) profileData.featured.name = newName;
        
        const newDesc = prompt('Enter project description:', profileData.featured.description);
        if (newDesc) profileData.featured.description = newDesc;
        
        const newTech = prompt('Enter technologies (comma separated):', profileData.featured.tech.join(', '));
        if (newTech) profileData.featured.tech = newTech.split(',').map(t => t.trim());
        
        renderFeatured();
        saveToStorage();
    });

    // ==================== PROJECTS MANAGEMENT ====================
    function renderProjects() {
        elements.projectsContainer.innerHTML = '';
        
        profileData.projects.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <img src="${project.image}" alt="${project.name}">
                <button class="delete-project" onclick="deleteProject(${index})">
                    <i class="fas fa-trash"></i>
                </button>
                <div class="project-info">
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <div class="project-tech">
                        ${project.tech.map(t => `<span>${t}</span>`).join('')}
                    </div>
                    <div class="project-stats">
                        <span><i class="fas fa-heart"></i> ${project.likes}</span>
                        <span><i class="fas fa-comment"></i> ${project.comments}</span>
                        <span><i class="fas fa-eye"></i> ${project.views}</span>
                    </div>
                    <div class="project-links">
                        <a href="${project.demo}" target="_blank"><i class="fas fa-external-link-alt"></i> Demo</a>
                        <a href="${project.github}" target="_blank"><i class="fab fa-github"></i> Code</a>
                    </div>
                </div>
            `;
            elements.projectsContainer.appendChild(card);
        });
    }

    window.deleteProject = function(index) {
        if (confirm('Are you sure you want to delete this project?')) {
            profileData.projects.splice(index, 1);
            profileData.stats.projects = profileData.projects.length;
            renderProjects();
            updateStatistics();
            saveToStorage();
        }
    };

    elements.showAddProjectBtn.addEventListener('click', () => {
        elements.addProjectForm.style.display = 'block';
        elements.showAddProjectBtn.style.display = 'none';
    });

    elements.cancelAddProject.addEventListener('click', () => {
        elements.addProjectForm.style.display = 'none';
        elements.showAddProjectBtn.style.display = 'flex';
        elements.projectName.value = '';
        elements.projectDesc.value = '';
        elements.projectTech.value = '';
        elements.projectDemo.value = '';
        elements.projectGithub.value = '';
        elements.projectImage.value = '';
        elements.fileName.textContent = 'لم يتم اختيار ملف';
    });

    elements.projectImage.addEventListener('change', (e) => {
        const file = e.target.files[0];
        elements.fileName.textContent = file ? file.name : 'لم يتم اختيار ملف';
    });

    elements.uploadProjectBtn.addEventListener('click', () => {
        const name = elements.projectName.value.trim();
        const description = elements.projectDesc.value.trim();
        const tech = elements.projectTech.value.trim();
        const demo = elements.projectDemo.value.trim() || '#';
        const github = elements.projectGithub.value.trim() || '#';
        const file = elements.projectImage.files[0];

        if (!name || !description || !tech) {
            showNotification('الرجاء إدخال جميع الحقول المطلوبة', 'error');
            return;
        }

        const techArray = tech.split(',').map(t => t.trim());

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profileData.projects.push({
                    id: Date.now(),
                    name: name,
                    description: description,
                    tech: techArray,
                    image: e.target.result,
                    demo: demo,
                    github: github,
                    likes: 0,
                    comments: 0,
                    views: 0,
                    date: new Date().toISOString().split('T')[0]
                });
                saveAndRenderProjects();
            };
            reader.readAsDataURL(file);
        } else {
            profileData.projects.push({
                id: Date.now(),
                name: name,
                description: description,
                tech: techArray,
                image: 'https://via.placeholder.com/300x150',
                demo: demo,
                github: github,
                likes: 0,
                comments: 0,
                views: 0,
                date: new Date().toISOString().split('T')[0]
            });
            saveAndRenderProjects();
        }
    });

    function saveAndRenderProjects() {
        profileData.stats.projects = profileData.projects.length;
        renderProjects();
        updateStatistics();
        saveToStorage();
        elements.cancelAddProject.click();
        showNotification('تم إضافة المشروع بنجاح!');
    }

    // ==================== BOOKS ====================
    function renderBooks() {
        elements.booksList.innerHTML = '';
        
        profileData.books.forEach(book => {
            const item = document.createElement('div');
            item.className = 'book-item';
            item.innerHTML = `
                <i class="fas fa-book"></i>
                <div class="book-info">
                    <span class="book-title">${book.title}</span>
                    <span class="book-author">${book.author}</span>
                </div>
            `;
            elements.booksList.appendChild(item);
        });
    }

    // ==================== ACHIEVEMENTS ====================
    function renderAchievements() {
        elements.badgesContainer.innerHTML = '';
        
        profileData.achievements.forEach(achievement => {
            const badge = document.createElement('div');
            badge.className = `badge-item ${achievement.unlocked ? '' : 'locked'}`;
            badge.setAttribute('data-tooltip', achievement.name);
            badge.innerHTML = `
                <i class="fas ${achievement.icon}"></i>
                <span>${achievement.name}</span>
            `;
            elements.badgesContainer.appendChild(badge);
        });
    }

    // ==================== COMMUNITY POSTS ====================
    function renderPosts() {
        elements.communityPosts.innerHTML = '';
        
        profileData.posts.forEach((post, postIndex) => {
            const postDiv = document.createElement('div');
            postDiv.className = 'post';
            postDiv.innerHTML = `
                <div class="post-header">
                    <span class="post-author">${post.author}</span>
                </div>
                <div class="post-content">${post.content}</div>
                <div class="post-actions">
                    <button class="like-btn ${post.liked ? 'active' : ''}" data-post-index="${postIndex}">
                        <i class="fas fa-heart"></i> ${post.likes}
                    </button>
                    <button class="comment-btn" data-post-index="${postIndex}">
                        <i class="fas fa-comment"></i> تعليق
                    </button>
                </div>
                <div class="comment-box" style="display: none;" data-post-index="${postIndex}">
                    <div class="comment-input">
                        <input type="text" placeholder="اكتب تعليق..." class="comment-input-field">
                        <button class="post-comment" data-post-index="${postIndex}">نشر</button>
                    </div>
                    <div class="comments-list">
                        ${post.comments.map(c => `<p>${c}</p>`).join('')}
                    </div>
                </div>
            `;
            elements.communityPosts.appendChild(postDiv);
        });

        // Add event listeners
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', handleLike);
        });

        document.querySelectorAll('.comment-btn').forEach(btn => {
            btn.addEventListener('click', handleCommentToggle);
        });

        document.querySelectorAll('.post-comment').forEach(btn => {
            btn.addEventListener('click', handlePostComment);
        });
    }

    function handleLike(e) {
        const btn = e.currentTarget;
        const postIndex = parseInt(btn.dataset.postIndex);
        const post = profileData.posts[postIndex];
        
        if (post.liked) {
            post.likes--;
        } else {
            post.likes++;
        }
        post.liked = !post.liked;
        
        btn.classList.toggle('active');
        btn.innerHTML = `<i class="fas fa-heart"></i> ${post.likes}`;
        
        saveToStorage();
    }

    function handleCommentToggle(e) {
        const btn = e.currentTarget;
        const postIndex = btn.dataset.postIndex;
        const commentBox = document.querySelector(`.comment-box[data-post-index="${postIndex}"]`);
        commentBox.style.display = commentBox.style.display === 'none' ? 'block' : 'none';
    }

    function handlePostComment(e) {
        const btn = e.currentTarget;
        const postIndex = btn.dataset.postIndex;
        const commentBox = document.querySelector(`.comment-box[data-post-index="${postIndex}"]`);
        const input = commentBox.querySelector('.comment-input-field');
        const comment = input.value.trim();
        
        if (comment) {
            profileData.posts[postIndex].comments.push(comment);
            const commentsList = commentBox.querySelector('.comments-list');
            const p = document.createElement('p');
            p.textContent = comment;
            commentsList.appendChild(p);
            input.value = '';
            
            saveToStorage();
        }
    }

    // ==================== QUESTIONS ====================
    function renderQuestions() {
        const questions = [
            'How can I connect Python to a database?',
            'What is the difference between list and tuple?',
            'How to learn Django fast?',
            'Best resources for JavaScript?'
        ];
        
        elements.questionsContainer.innerHTML = '';
        questions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-card';
            questionDiv.innerHTML = `
                <p>${q}</p>
                <div class="answer-input">
                    <input type="text" placeholder="اكتب إجابتك..." class="answer-field" data-question="${index}">
                    <button class="submit-answer" data-question="${index}">إرسال</button>
                </div>
            `;
            elements.questionsContainer.appendChild(questionDiv);
        });

        document.querySelectorAll('.submit-answer').forEach(btn => {
            btn.addEventListener('click', handleAnswer);
        });
    }

    function handleAnswer(e) {
        const btn = e.currentTarget;
        const questionIndex = btn.dataset.question;
        const input = document.querySelector(`.answer-field[data-question="${questionIndex}"]`);
        const answer = input.value.trim();
        
        if (answer) {
            profileData.stats.questions++;
            elements.questionsCount.textContent = profileData.stats.questions;
            showNotification('تم إرسال إجابتك بنجاح!');
            input.value = '';
            updateStatistics();
            saveToStorage();
        }
    }

    // ==================== TIMELINE ====================
    function renderTimeline() {
        elements.timeline.innerHTML = '';
        
        profileData.timeline.forEach(item => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            timelineItem.innerHTML = `
                <div class="timeline-time">${item.time}</div>
                <div class="timeline-content">${item.action}</div>
            `;
            elements.timeline.appendChild(timelineItem);
        });
    }

    // ==================== PORTFOLIO ====================
    function renderPortfolio() {
        elements.portfolioLinks.innerHTML = '';
        
        const links = [
            { type: 'github', icon: 'fab fa-github', url: profileData.portfolio.github },
            { type: 'linkedin', icon: 'fab fa-linkedin', url: profileData.portfolio.linkedin },
            { type: 'website', icon: 'fas fa-globe', url: profileData.portfolio.website }
        ];
        
        links.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.className = 'portfolio-link';
            a.setAttribute('data-type', link.type);
            a.target = '_blank';
            a.innerHTML = `<i class="${link.icon}"></i> ${link.type.charAt(0).toUpperCase() + link.type.slice(1)}`;
            elements.portfolioLinks.appendChild(a);
        });
    }

    elements.editPortfolio.addEventListener('click', () => {
        const github = prompt('Enter GitHub URL:', profileData.portfolio.github);
        if (github) profileData.portfolio.github = github;
        
        const linkedin = prompt('Enter LinkedIn URL:', profileData.portfolio.linkedin);
        if (linkedin) profileData.portfolio.linkedin = linkedin;
        
        const website = prompt('Enter Website URL:', profileData.portfolio.website);
        if (website) profileData.portfolio.website = website;
        
        renderPortfolio();
        saveToStorage();
    });

    // ==================== SAVED PROJECTS ====================
    function renderSavedProjects() {
        elements.savedProjects.innerHTML = '';
        
        profileData.savedProjects.forEach((project, index) => {
            const item = document.createElement('div');
            item.className = 'saved-project-item';
            item.innerHTML = `
                <div class="saved-project-info">
                    <h4>${project.name}</h4>
                    <span>بواسطة ${project.author}</span>
                </div>
                <div class="saved-project-actions">
                    <button onclick="removeSavedProject(${index})">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            elements.savedProjects.appendChild(item);
        });
    }

    window.removeSavedProject = function(index) {
        profileData.savedProjects.splice(index, 1);
        renderSavedProjects();
        saveToStorage();
    };

    // ==================== INITIALIZE ALL ====================
    function initializePage() {
        updateProfileDisplay();
        updateStatistics();
        renderSkills();
        renderLearningProgress();
        renderFeatured();
        renderProjects();
        renderBooks();
        renderAchievements();
        renderPosts();
        renderQuestions();
        renderTimeline();
        renderPortfolio();
        renderSavedProjects();
    }

    initializePage();
});