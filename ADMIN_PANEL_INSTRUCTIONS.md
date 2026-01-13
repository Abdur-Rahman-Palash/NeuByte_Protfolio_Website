# Admin Panel Instructions

## ✅ আপনার 3টি Blog Post আছে:

1. **AI for Small Businesses** (ai-for-small-businesses.md)
2. **AI-Native Web Development** (ai-native-web-development.md)  
3. **Machine Learning Integration** (machine-learning-integration.md)

## 🔧 Admin Panel ব্যবহার করার জন্য:

### Step 1: Development Server চালু করুন
```bash
npm run dev
```

### Step 2: Admin Panel Access করুন
1. Browser এ যান: `http://localhost:3000/admin/index.html`
2. Login করুন:
   - **Username:** `neubyte`
   - **Password:** `NeUbYtE@786`

### Step 3: Blog Posts Edit করুন
- Login এর পর আপনি সব 3টি blog post দেখতে পাবেন
- প্রতিটি post এর পাশে **Edit** button আছে
- Click করে edit করতে পারবেন

## ⚠️ Important Notes:

1. **Admin Panel শুধুমাত্র Development Mode এ কাজ করে**
   - Production/Static export এ API routes কাজ করে না
   - তাই blog posts edit করতে হলে `npm run dev` চালু রাখতে হবে

2. **Blog Posts Edit করার পর:**
   - Changes automatically save হবে `markdown/blogs/` folder এ
   - Production এ deploy করতে হলে `npm run build:static` চালু করুন

3. **Production Deploy:**
   - Static export এ admin panel কাজ করবে না
   - Blog posts edit করতে হলে locally edit করুন, তারপর rebuild করুন

## 🐛 Troubleshooting:

**"No blog posts yet" দেখাচ্ছে?**
- ✅ Development server চালু আছে কিনা check করুন (`npm run dev`)
- ✅ Browser console এ error check করুন (F12)
- ✅ `http://localhost:3000/api/blogs` এ directly visit করে দেখুন posts আসছে কিনা

**API Error দেখাচ্ছে?**
- Development mode এ API routes কাজ করবে
- Static export/build mode এ কাজ করবে না
