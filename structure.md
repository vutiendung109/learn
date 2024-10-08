# Project Structure

- .gitattributes
- .gitignore
- docker-compose.yml
- elearning-platform/
  - .env
  - assets/
    - img/
      - default-avatar.jpg
      - khv.jpg
      - tien.png
  - package-lock.json
  - package.json
  - src/
    - config/
      - db.js
    - controllers/
      - adminController.js
      - authController.js
      - courseController.js
      - enrollmentController.js
      - lessonController.js
      - reviewController.js
      - sectionController.js
    - middleware/
      - auth.js
      - checkAdminRole.js
      - checkRole.js
      - pagination.js
    - models/
      - Course.js
      - Enrollment.js
      - Lesson.js
      - Review.js
      - Section.js
      - User.js
    - routes/
      - admin.js
      - auth.js
      - course.js
      - enrollments.js
      - lesson.js
      - reviews.js
      - section.js
      - user.js
    - server.js
- find
- frontend/
  - admin/
    - assets/
      - documents/
      - images/
        - courses/
      - videos/
    - config/
    - css/
      - course-cotent.css
      - course.css
      - dashboard.css
      - lore.css
      - main.css
      - users.css
    - index.html
    - js/
      - api.js
      - auth.js
      - course-content.js
      - courses.js
      - dashboard.js
      - lessons.js
      - main.js
      - sections.js
      - users.js
    - lib/
    - login.html
    - pages/
      - course-content.html
      - courses.html
      - dashboard.html
      - users.html
    - register.html
    - templates/
      - footer.html
      - header.html
      - sidebar.html
  - client/
    - app.js
    - assets/
      - css/
        - courseDetail.css
        - courses.css
        - ctkh.css
        - header.css
        - login.css
        - main.css
        - payment.css
        - reset.css
        - xemkh.css
      - fonts/
      - icons/
        - chevron-left.svg
        - chevron-right.svg
        - code.svg
        - facebook.svg
        - instagram.svg
        - linkedin.svg
        - list.svg
        - open-quotes.svg
        - play.svg
        - speaker.svg
        - star.svg
        - twitter.svg
      - img/
        - blog-1.jpg
        - blog-2.jpg
        - blog-3.jpg
        - course-1.jpg
        - course-2.jpg
        - course-3.jpg
        - courseMysql.png
        - coursePython.png
        - courseReact.png
        - feature-1.jpg
        - feature-2.jpg
        - feature-3.jpg
        - feedback-avatar-1.jpg
        - feedback-avatar-2.jpg
        - feedback-avatar-3.jpg
        - hero-img.jpg
        - hero-test.webp
        - html-css.png
        - js.png
        - logo-white.svg
        - logo.svg
        - nodejs.png
        - qr.jpg
      - js/
        - main.js
      - video/
        - video-demo.mp4
    - components/
      - AuthModal.js
      - CourseItem.js
      - Footer.js
      - Header.js
    - index.html
    - main.js
    - pages/
      - Checkout.js
      - CourseDetail.js
      - CourseLearning.js
      - CourseList.js
      - Home.js
      - Login.js
      - Payment.js
      - Profile.js
      - Register.js
    - utils/
      - api.js
      - auth.js
      - router.js
  - shared/
    - assets/
      - css/
      - img/
        - default-avatar.jpg
    - js/
    - pages/
- generate_structure.py
- mysql-data/
  - #ib_16384_0.dblwr
  - #ib_16384_1.dblwr
  - #innodb_redo/
    - #ib_redo10
    - #ib_redo11_tmp
    - #ib_redo12_tmp
    - #ib_redo13_tmp
    - #ib_redo14_tmp
    - #ib_redo15_tmp
    - #ib_redo16_tmp
    - #ib_redo17_tmp
    - #ib_redo18_tmp
    - #ib_redo19_tmp
    - #ib_redo20_tmp
    - #ib_redo21_tmp
    - #ib_redo22_tmp
    - #ib_redo23_tmp
    - #ib_redo24_tmp
    - #ib_redo25_tmp
    - #ib_redo26_tmp
    - #ib_redo27_tmp
    - #ib_redo28_tmp
    - #ib_redo29_tmp
    - #ib_redo30_tmp
    - #ib_redo31_tmp
    - #ib_redo32_tmp
    - #ib_redo33_tmp
    - #ib_redo34_tmp
    - #ib_redo35_tmp
    - #ib_redo36_tmp
    - #ib_redo37_tmp
    - #ib_redo38_tmp
    - #ib_redo39_tmp
    - #ib_redo40_tmp
    - #ib_redo41_tmp
  - #innodb_temp/
    - temp_1.ibt
    - temp_10.ibt
    - temp_2.ibt
    - temp_3.ibt
    - temp_4.ibt
    - temp_5.ibt
    - temp_6.ibt
    - temp_7.ibt
    - temp_8.ibt
    - temp_9.ibt
  - auto.cnf
  - binlog.000001
  - binlog.000002
  - binlog.000003
  - binlog.000004
  - binlog.000005
  - binlog.000006
  - binlog.000007
  - binlog.000008
  - binlog.000009
  - binlog.000010
  - binlog.000011
  - binlog.000012
  - binlog.000013
  - binlog.000014
  - binlog.000015
  - binlog.000016
  - binlog.000017
  - binlog.000018
  - binlog.000019
  - binlog.index
  - ca-key.pem
  - ca.pem
  - client-cert.pem
  - client-key.pem
  - elearning_db/
    - categories.ibd
    - courses.ibd
    - enrollments.ibd
    - lessons.ibd
    - sections.ibd
    - users.ibd
  - ibdata1
  - ibtmp1
  - ib_buffer_pool
  - mysql.ibd
  - mysql.sock
  - private_key.pem
  - public_key.pem
  - server-cert.pem
  - server-key.pem
  - sys/
    - sys_config.ibd
  - undo_001
  - undo_002
- package-lock.json
- package.json
- structure.md
- structure.txt
