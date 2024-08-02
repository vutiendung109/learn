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
      - course.css
      - dashboard.css
      - main.css
      - users.css
    - index.html
    - js/
      - api.js
      - courses.js
      - dashboard.js
      - lessons.js
      - main.js
      - sections.js
      - users.js
    - lib/
    - pages/
      - courses.html
      - dashboard.html
      - users.html
    - templates/
      - footer.html
      - header.html
      - sidebar.html
  - client/
    - index.html
  - shared/
    - api.js
    - assets/
      - img/
        - default-avatar.jpg
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
    - #ib_redo9
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
  - binlog.index
  - ca-key.pem
  - ca.pem
  - client-cert.pem
  - client-key.pem
  - elearning_db/
    - blog_posts.ibd
    - courses.ibd
    - enrollments.ibd
    - lessons.ibd
    - orders.ibd
    - order_items.ibd
    - reviews.ibd
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
- structure.md
- structure.txt