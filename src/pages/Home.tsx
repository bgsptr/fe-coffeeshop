// import "../assets/css/style.css"

const Home = () => {
  return (
    <div>
      {" "}
      <header>
        <nav class="navbar">
          <div class="logo-left-nav">
            <svg
              class="navbar-logo-company"
              width="50"
              height="50"
              viewBox="0 0 75 75"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="20"
                cy="20"
                r="20"
                transform="matrix(1 0 0 -1 18 58)"
                fill="url(#paint0_linear_658_117)"
              />
              <circle
                cx="37.5"
                cy="37.5"
                r="32.5"
                stroke="white"
                stroke-width="10"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_658_117"
                  x1="20"
                  y1="0"
                  x2="20"
                  y2="40"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#2F8965" />
                  <stop offset="1" stop-color="#2D3E70" />
                </linearGradient>
              </defs>
            </svg>
            <p>Maison du Café</p>
          </div>
          <ul class="right-nav">
            <li>
              <a class="link-nav" href="#home">
                Home
              </a>
            </li>
            <li>
              <a class="link-nav" href="#menu">
                Menus
              </a>
            </li>
            <li>
              <a class="link-nav" href="#about">
                About
              </a>
            </li>
          </ul>
          <a class="hamburger-nav" onclick="showNavbarInMobile()">
            <svg
              width="36px"
              height="36px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 18L20 18"
                stroke="#ffffff"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M4 12L20 12"
                stroke="#ffffff"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M4 6L20 6"
                stroke="#ffffff"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </a>
        </nav>
        <div class="mobile-nav mobile-nav-display">
          <ul>
            <li>
              <a class="link-mobile-nav" href="#home">
                Home
              </a>
            </li>
            <li>
              <a class="link-mobile-nav" href="#menu">
                Menus
              </a>
            </li>
            <li>
              <a class="link-mobile-nav" href="#about">
                About
              </a>
            </li>
          </ul>
        </div>
      </header>
      <main>
        <div id="content">
          <div>
            <article>
              <div class="hero-header">
                <h3>Savor The</h3>
                <span class="span-1">BREW,</span>
                <h3 class="hero-h3no2">Savor The</h3>
                <span class="span-2">MOMENT</span>
              </div>
              <div class="hero-time">
                <p>Monday to Friday: 7:00 AM - 9:00 PM</p>
                <p>Saturday n Sunday: 8:00 AM - 10:00 PM</p>
              </div>
              <div class="hero-paragraph-container">
                <p class="hero-paragraph">
                  Whether you're starting your morning with a fresh cup of
                  coffee or winding down in the evening with a cozy brew, our
                  doors are open to welcome you. Stop by and enjoy a moment of
                  relaxation, any day of the week.
                </p>
              </div>
            </article>

            <aside class="hero-container-aside">
              <img
                class="hero-aside"
                src="assets/image/coffee-hero1.png"
                alt="pour-coffee"
              />
            </aside>
          </div>
        </div>

        <section class="service-section">
          <div>
            <div class="service-box">
              <img src="assets/image/coffee-seed.png" alt="" />
              <h3>Local Coffee</h3>
              <p>
                Savor the richness of locally crafted coffee, served with love
                in a place dedicated to true coffee enthusiasts. Maison du Café
                is more than just a café—it's an elegant oasis, offering a blend
                of the art of brewing and exceptional flavors. Enjoy your
                favorite drink, from rich espresso to other delightful coffee
                options.
              </p>
            </div>
            <div class="service-box">
              <img src="assets/image/elegant-model.png" alt="" />
              <h3>Elegant Private Tables</h3>
              <p>
                Experience the luxury of elegant private tables at Maison du
                Café. Each lounge is designed with a cozy and tranquil ambiance,
                perfect for relaxing or holding business meetings. With warm
                lighting and elegant furnishings, this space offers an
                unparalleled relaxation experience.
              </p>
            </div>
            <div class="service-box">
              <img src="assets/image/live-music.png" alt="" />
              <h3>Live Music Evenings</h3>
              <p>
                In the evenings, Maison du Café transforms into the perfect
                place to enjoy live music. We feature local musicians who play
                various genres, creating a warm and enjoyable atmosphere. Enjoy
                live music while savoring your favorite drink, and let yourself
                be carried away by the enchanting evening ambiance.
              </p>
            </div>
          </div>

          <div class="bullet-slider">
            <div class="bullet-point"></div>
            <div class="bullet-point"></div>
            <div class="bullet-point"></div>
          </div>
        </section>

        <section class="menus" id="menu">
          <h3>Special Promos</h3>
          <div class="viewing-container">
            <div class="carousel-slider">
              <div class="carousel-item">
                <img
                  class="carousel-img"
                  src="assets/image/carousel-1.png"
                  alt=""
                />
                <h6 class="carousel-title">Old Fashioned Cocktail</h6>
                <p class="carousel-desc">
                  <q>
                    Savor the classic taste! Enjoy 15% off our Old Fashioned
                    Cocktail.
                  </q>
                </p>
                <h6 class="carousel-additional-info">90% OFF</h6>
                <div class="slider-pointer"></div>
              </div>
              <div class="carousel-item">
                <img src="assets/image/carousel-2.png" alt="" />
              </div>
              <div class="carousel-item">
                <img src="assets/image/carousel-3.png" alt="" />
              </div>
              <div class="carousel-item">
                <img src="assets/image/carousel-2.png" alt="" />
              </div>
            </div>
          </div>
          <div class="menus-category">
            <div class="all-menu">
              <p>All Menu</p>
            </div>
            <div class="unselected-menu">
              <p>Main Courses</p>
            </div>
            <div class="unselected-menu">
              <p>Healthy Choices</p>
            </div>
            <div class="unselected-menu">
              <p>Gourmet Specials</p>
            </div>
          </div>

          <div class="dropdown-food-category">
            <select name="cars" id="cars">
              <option>View All Category</option>
              <option>All Menu</option>
              <option>Main Courses</option>
              <option>Healthy Choices</option>
              <option>Gourmet Specials</option>
            </select>
          </div>

          <div></div>

          <div class="fnb-container">
            <div class="fnb-option">
              <img src="assets/image/food-1.png" alt="food-1" />
              <div class="fnb-header">
                <p class="fnb-name">Cajun Potato Wedges</p>
                <p class="fnb-price">110k</p>
              </div>
              <p class="fnb-desc">
                Maison du Café is more than just a café—it's a destination where
                every visit leaves you with lasting memories.
              </p>
            </div>

            <div class="fnb-option">
              <img src="assets/image/food-2.png" alt="food-2" />
              <div class="fnb-header">
                <p class="fnb-name">Cajun Potato Wedges</p>
                <p class="fnb-price">110k</p>
              </div>
              <p class="fnb-desc">
                Maison du Café is more than just a café—it's a destination where
                every visit leaves you with lasting memories.
              </p>
            </div>

            <div class="fnb-option">
              <img src="assets/image/food-3.png" alt="food-3" />
              <div class="fnb-header">
                <p class="fnb-name">Cajun Potato Wedges</p>
                <p class="fnb-price">110k</p>
              </div>
              <p class="fnb-desc">
                Maison du Café is more than just a café—it's a destination where
                every visit leaves you with lasting memories.
              </p>
            </div>

            <div class="fnb-option">
              <img src="assets/image/food-4.png" alt="" />
              <div class="fnb-header">
                <p class="fnb-name">Cajun Potato Wedges</p>
                <p class="fnb-price">110k</p>
              </div>
              <p class="fnb-desc">
                Maison du Café is more than just a café—it's a destination where
                every visit leaves you with lasting memories.
              </p>
            </div>
          </div>
        </section>

        <section class="" id="second-content">
          <aside>
            <img
              src="assets/image/memorable.png"
              alt="memorable-moment"
              class="img-memorable"
            />
          </aside>
          <article class="memorable">
            <div class="parent-circle">
              <h6>
                <span>
                  <div class="back big-circle"></div>W
                </span>
                here Culinary Delights Meet Memorable Moment
                <span class="parent-small-circle">
                  s<div class="small-circle"></div>
                </span>
              </h6>
            </div>
            <p>
              Explore Our Exquisite Menu: From freshly brewed coffee to gourmet
              dishes, each item is crafted to perfection
            </p>
          </article>
        </section>

        <section id="about" class="about-us">
          <div class="about-us-header">
            <h3>
              <span class="about-span-1">What</span>
              <span class="about-span-2"> THEY</span> say
            </h3>
            <h3>
              About <span class="about-span-3">US</span>
            </h3>
          </div>
          <div class="user-review">
            <div class="card">
              <div class="card-review-content">
                <div class="photo-reviewer"></div>
                <h6>— Nauffal S.</h6>
                <p>
                  <q>
                    The perfect spot to unwind. The coffee is always amazing,
                    and the atmosphere is just what I need to relax.
                  </q>
                </p>
              </div>
            </div>

            <div class="card">
              <div class="card-review-content">
                <div class="photo-reviewer"></div>
                <h6>— Jarips Wumbo.</h6>
                <p>
                  <q>
                    The staff is friendly, and the coffee is simply the best.
                    It's my go-to place for a midday pick-me-up.
                  </q>
                </p>
              </div>
            </div>

            <div class="card">
              <div class="card-review-content">
                <div class="photo-reviewer"></div>
                <h6>— Candra R.</h6>
                <p>
                  <q>
                    A cozy haven with the best coffee in town! I come here every
                    morning to start my day with a smile.
                  </q>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div class="footer-container">
          <div class="footer-company">
            <svg
              class="footer-logo-company"
              width="50"
              height="50"
              viewBox="0 0 75 75"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="20"
                cy="20"
                r="20"
                transform="matrix(1 0 0 -1 18 58)"
                fill="url(#paint0_linear_658_117)"
              />
              <circle
                cx="37.5"
                cy="37.5"
                r="32.5"
                stroke="white"
                stroke-width="10"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_658_117"
                  x1="20"
                  y1="0"
                  x2="20"
                  y2="40"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#2F8965" />
                  <stop offset="1" stop-color="#2D3E70" />
                </linearGradient>
              </defs>
            </svg>

            <p>Maison du Café</p>
          </div>
          <div class="footer-nav">
            <ul>
              <li>Contact</li>
              <li>About</li>
            </ul>
          </div>

          <div class="footer-information">
            <div class="footer-working-hour">
              <p>Open Daily</p>
              <p>Weekdays (Monday - Friday) 09:00 AM - 10 PM</p>
              <p>Weekend (Saturday & Sunday) 08:00 AM - 11 PM</p>
            </div>

            <div class="footer-working-address">
              <p>Umasari, Jalan Pulau Moyo Gang Telkom II No. 19</p>
              <p>Pedungan, Denpasar Selatan DENPASAR SELATAN,</p>
              <p>KOTA DENPASAR, BALI, ID 80222</p>
            </div>

            <p class="footer-wa">WA +62 819-0241-4670</p>
          </div>

          <div class="social-media-company">
            <svg
              class="ig-company"
              width="45"
              height="45"
              viewBox="0 0 45 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.5 4.05414C28.5077 4.05414 29.2193 4.077 31.5918 4.18525C33.7856 4.28537 34.9769 4.65191 35.7699 4.95996C36.82 5.36812 37.5696 5.85578 38.3569 6.64308C39.1442 7.43038 39.6319 8.17999 40.04 9.23014C40.3481 10.0231 40.7146 11.2144 40.8148 13.4081C40.923 15.7807 40.9459 16.4923 40.9459 22.5C40.9459 28.5078 40.923 29.2194 40.8148 31.5919C40.7146 33.7857 40.3481 34.977 40.04 35.7699C39.6319 36.8201 39.1442 37.5697 38.3569 38.357C37.5696 39.1443 36.82 39.632 35.7699 40.04C34.9769 40.3482 33.7856 40.7147 31.5918 40.8148C29.2197 40.9231 28.5081 40.946 22.5 40.946C16.4918 40.946 15.7802 40.9231 13.4081 40.8148C11.2143 40.7147 10.023 40.3482 9.23014 40.04C8.1799 39.632 7.43029 39.1443 6.64299 38.357C5.85569 37.5697 5.36803 36.8201 4.95996 35.7699C4.65182 34.977 4.28528 33.7857 4.18516 31.592C4.07691 29.2194 4.05405 28.5078 4.05405 22.5C4.05405 16.4923 4.07691 15.7807 4.18516 13.4082C4.28528 11.2144 4.65182 10.0231 4.95996 9.23014C5.36803 8.17999 5.85569 7.43038 6.64299 6.64308C7.43029 5.85578 8.1799 5.36812 9.23014 4.95996C10.023 4.65191 11.2143 4.28537 13.408 4.18525C15.7806 4.077 16.4922 4.05414 22.5 4.05414ZM22.5 0C16.3893 0 15.6231 0.025901 13.2233 0.1354C10.8283 0.24472 9.19281 0.625019 7.76156 1.18127C6.28198 1.75627 5.02721 2.52562 3.77637 3.77646C2.52553 5.0273 1.75618 6.28207 1.18118 7.76164C0.624929 9.1929 0.244631 10.8284 0.135311 13.2234C0.0258117 15.6231 0 16.3894 0 22.5C0 28.6107 0.0258117 29.3769 0.135311 31.7767C0.244631 34.1717 0.624929 35.8072 1.18118 37.2384C1.75618 38.7179 2.52553 39.9728 3.77637 41.2236C5.02721 42.4745 6.28198 43.2438 7.76156 43.8188C9.19281 44.3751 10.8283 44.7554 13.2233 44.8647C15.6231 44.9742 16.3893 45 22.5 45C28.6106 45 29.3769 44.9742 31.7766 44.8647C34.1716 44.7554 35.8071 44.3751 37.2384 43.8188C38.7179 43.2438 39.9727 42.4745 41.2235 41.2236C42.4744 39.9728 43.2437 38.718 43.8187 37.2384C44.375 35.8072 44.7553 34.1717 44.8646 31.7767C44.9741 29.3769 45 28.6107 45 22.5C45 16.3894 44.9741 15.6231 44.8646 13.2234C44.7553 10.8284 44.375 9.1929 43.8187 7.76164C43.2437 6.28207 42.4744 5.0273 41.2235 3.77646C39.9727 2.52562 38.7179 1.75627 37.2384 1.18127C35.8071 0.625019 34.1716 0.24472 31.7766 0.1354C29.3769 0.025901 28.6106 0 22.5 0ZM22.5 10.946C16.1188 10.946 10.9459 16.1189 10.9459 22.5C10.9459 28.8812 16.1188 34.0541 22.5 34.0541C28.8811 34.0541 34.054 28.8812 34.054 22.5C34.054 16.1189 28.8811 10.946 22.5 10.946ZM22.5 30.0001C18.3578 30.0001 14.9999 26.6422 14.9999 22.5C14.9999 18.3579 18.3578 15 22.5 15C26.6421 15 30 18.3579 30 22.5C30 26.6422 26.6421 30.0001 22.5 30.0001ZM37.2105 10.4895C37.2105 11.9807 36.0017 13.1895 34.5105 13.1895C33.0193 13.1895 31.8105 11.9807 31.8105 10.4895C31.8105 8.99829 33.0193 7.78951 34.5105 7.78951C36.0017 7.78951 37.2105 8.99829 37.2105 10.4895Z"
                fill="#757575"
              />
            </svg>

            <svg
              class="fb-company"
              width="46"
              height="46"
              viewBox="0 0 46 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_495_220)">
                <path
                  d="M46 23C46 10.2974 35.7026 0 23 0C10.2974 0 0 10.2974 0 23C0 34.48 8.41077 43.9951 19.4062 45.7206V29.6484H13.5664V23H19.4062V17.9328C19.4062 12.1684 22.84 8.98438 28.0937 8.98438C30.6101 8.98438 33.2422 9.43359 33.2422 9.43359V15.0938H30.3419C27.4848 15.0938 26.5938 16.8667 26.5938 18.6856V23H32.9727L31.9529 29.6484H26.5938V45.7206C37.5892 43.9951 46 34.48 46 23Z"
                  fill="#757575"
                />
                <path
                  d="M31.9529 29.6484L32.9727 23H26.5938V18.6856C26.5938 16.8667 27.4848 15.0938 30.3419 15.0938H33.2422V9.43359C33.2422 9.43359 30.6101 8.98438 28.0937 8.98438C22.84 8.98438 19.4062 12.1684 19.4062 17.9328V23H13.5664V29.6484H19.4062V45.7206C20.5772 45.9043 21.7774 46 23 46C24.2226 46 25.4228 45.9043 26.5938 45.7206V29.6484H31.9529Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_495_220">
                  <rect width="46" height="46" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <svg
              class="tiktok-company"
              width="42"
              height="42"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M33.8124 9.73383C33.5466 9.59647 33.2879 9.44589 33.0372 9.28266C32.3082 8.80069 31.6397 8.23278 31.0463 7.59117C29.5616 5.8923 29.007 4.16883 28.8028 2.96215H28.811C28.6403 1.96055 28.7109 1.3125 28.7216 1.3125H21.9589V27.4624C21.9589 27.8135 21.9589 28.1605 21.9441 28.5034C21.9441 28.5461 21.94 28.5854 21.9376 28.6314C21.9376 28.6502 21.9376 28.6699 21.9335 28.6896C21.9335 28.6945 21.9335 28.6995 21.9335 28.7044C21.8622 29.6426 21.5614 30.549 21.0576 31.3437C20.5538 32.1385 19.8625 32.7972 19.0443 33.262C18.1917 33.7471 17.2273 34.0016 16.2462 34.0003C13.0954 34.0003 10.5418 31.4311 10.5418 28.2581C10.5418 25.0852 13.0954 22.5159 16.2462 22.5159C16.8427 22.5154 17.4354 22.6092 18.0025 22.794L18.0107 15.9083C16.2892 15.6859 14.5403 15.8228 12.8742 16.3101C11.2082 16.7975 9.6613 17.6249 8.33105 18.74C7.16544 19.7528 6.1855 20.9612 5.43535 22.3109C5.14988 22.803 4.07281 24.7808 3.94238 27.9907C3.86035 29.8126 4.40749 31.7002 4.66835 32.4803V32.4967C4.83242 32.9561 5.46816 34.5237 6.50421 35.8452C7.33965 36.9053 8.32669 37.8365 9.43355 38.6088V38.5924L9.44995 38.6088C12.7238 40.8335 16.3537 40.6875 16.3537 40.6875C16.9821 40.6621 19.087 40.6875 21.4774 39.5546C24.1286 38.2987 25.638 36.4276 25.638 36.4276C26.6023 35.3096 27.369 34.0355 27.9053 32.6599C28.5173 31.0513 28.7216 29.1219 28.7216 28.3508V14.4777C28.8036 14.5269 29.8962 15.2496 29.8962 15.2496C29.8962 15.2496 31.4704 16.2586 33.9264 16.9157C35.6885 17.3832 38.0625 17.4817 38.0625 17.4817V10.7682C37.2307 10.8585 35.5416 10.596 33.8124 9.73383Z"
                fill="#757575"
              />
            </svg>

            <svg
              class="yt-company"
              width="52"
              height="36"
              viewBox="0 0 52 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_495_229)">
                <path
                  d="M50.8516 5.61494C50.2446 3.40641 48.4925 1.6812 46.2494 1.08358C42.2142 0 25.9733 0 25.9733 0C25.9733 0 9.73231 0.032836 5.69709 1.11642C3.45405 1.71404 1.70189 3.43925 1.09493 5.64777C-0.12564 12.7075 -0.599195 23.4645 1.12828 30.2419C1.73524 32.4504 3.4874 34.1756 5.73044 34.7732C9.76566 35.8568 26.0066 35.8568 26.0066 35.8568C26.0066 35.8568 42.2475 35.8568 46.2828 34.7732C48.5258 34.1756 50.278 32.4504 50.8849 30.2419C52.1722 23.1723 52.569 12.4218 50.8516 5.61494Z"
                  fill="#757575"
                />
                <path
                  d="M20.8042 25.6113L34.2772 17.9277L20.8042 10.2441V25.6113Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_495_229">
                  <rect width="52" height="36" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          <div class="company-copyright">
            <p>&#169; Maison du Café 2022 - 2023. All rights Reserved.</p>
            <p>Terms | Privacy</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
