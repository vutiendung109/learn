export class Home {
    async render(parent) {
        parent.innerHTML = `
            <main style="height: 2000px">
                <div class="hero">
                    <div class="main-content">
                        <div class="body">
                            <div class="media-block">
                                <img src="/client/assets/img/hero-test.webp" alt="img learing" class="img">
                                <div class="hero-summary">
                                    <div class="item">
                                        <div class="icon">
                                            <img src="/client/assets/icons/list.svg" alt="">
                                        </div>
                                        <div class="info">
                                            <p class="label">2 Khoá học</p>
                                            <p class="title">UI/UX</p>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="icon">
                                            <img src="/client/assets/icons/code.svg" alt="">
                                        </div>
                                        <div class="info">
                                            <p class="label">2 Khoá học</p>
                                            <p class="title">Backend</p>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="icon">
                                            <img src="/client/assets/icons/speaker.svg" alt="">
                                        </div>
                                        <div class="info">
                                            <p class="label">1 Khoá học</p>
                                            <p class="title">BA</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="content-block">
                                <h1 class="heading lv1">HỌC LẬP TRÌNH FROM ZERO TO HERO</h1>
                                <p class="desc">Xây dựng kĩ năng và phát triển sản phẩm của bạn</p>
                                <div class="cta-group">
                                    <a href="#!" class="btn hero-cta">Xem khoá học</a>
                                </div>
                                <p class="desc">Tương tác</p>
                                <p class="desc stats"><strong>10K</strong> Học Viên <strong>5+</strong> Khoá Học</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="popular">
                    <div class="main-content">
                        <div class="popular-top">
                            <div class="info">
                                <h2 class="heading lv2">Khoá học phổ biến</h2>
                            </div>
                            <div class="controls">
                                <button class="control-btn">
                                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 1L1 7L7 13" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                <button class="control-btn">
                                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L7 7L1 13" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="course-list">
                            <div class="course-item">
                                <a href="#!">
                                    <img src="/client/assets/img/html-css.png" alt="" class="thumb">
                                </a>
                                <div class="info">
                                    <div class="head">
                                        <h3 class="title">HTML,CSS</h3>
                                        <div class="rating">
                                            <img src="/client/assets/icons/star.svg" alt="Star" class="star">
                                            <span class="value">4.5</span>
                                        </div>
                                    </div>
                                    <p class="desc">Khoá học HTML,CSS cơ bản cho người mới bắt đầu</p>
                                    <div class="foot">
                                        <span class="price">1.000.000</span>
                                        <button class="btn book-btn">Xem ngay</button>
                                    </div>
                                </div>
                            </div>
                            <div class="course-item">
                                <a href="#!">
                                    <img src="/client/assets/img/js.png" alt="" class="thumb">
                                </a>
                                <div class="info">
                                    <div class="head">
                                        <h3 class="title">JavaScript</h3>
                                        <div class="rating">
                                            <img src="/client/assets/icons/star.svg" alt="Star" class="star">
                                            <span class="value">4.8</span>
                                        </div>
                                    </div>
                                    <p class="desc">Khoá học JavaScript cơ bản cho người mới bắt đầu</p>
                                    <div class="foot">
                                        <span class="price">1.000.000</span>
                                        <button class="btn book-btn">Xem ngay</button>
                                    </div>
                                </div>
                            </div>
                            <div class="course-item">
                                <a href="#!">
                                    <img src="/client/assets/img/nodejs.png" alt="" class="thumb">
                                </a>
                                <div class="info">
                                    <div class="head">
                                        <h3 class="title">NodeJs</h3>
                                        <div class="rating">
                                            <img src="/client/assets/icons/star.svg" alt="Star" class="star">
                                            <span class="value">4.9</span>
                                        </div>
                                    </div>
                                    <p class="desc">Khoá học NodeJs cơ bản cho người mới bắt đầu (cần có kiến thức cơ bản về html,css,js)</p>
                                    <div class="foot">
                                        <span class="price">1.500.000</span>
                                        <button class="btn book-btn">Xem ngay</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        `;
    }
}
