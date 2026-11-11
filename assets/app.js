

const HOTEL_PHONE = "918840226276";
const MAP_URL = "https://maps.app.goo.gl/RSSwsDZzc7Ve38Tt5";
const WA_URL = "https://wa.me/" + HOTEL_PHONE;


document.addEventListener("DOMContentLoaded", () => {


  // Mobile navigation
  const menu = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav-links");


  if (menu && nav) {
    menu.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }


  // Phone links
  document.querySelectorAll("[data-phone]").forEach(el => {
    el.href = "tel:+" + HOTEL_PHONE;
  });


  // WhatsApp links
  document.querySelectorAll("[data-wa]").forEach(el => {
    el.href = WA_URL + "?text=" +
      encodeURIComponent(
        "Hello Hotel Fortune Suites, I would like to enquire about a booking."
      );
    el.target = "_blank";
    el.rel = "noopener";
  });


  // Google Maps links
  document.querySelectorAll("[data-map]").forEach(el => {
    el.href = MAP_URL;
    el.target = "_blank";
    el.rel = "noopener";
  });


  // Scroll reveal animations
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });


  document.querySelectorAll(".reveal").forEach(el => {
    observer.observe(el);
  });


  // Booking form
  document.querySelectorAll("[data-booking]").forEach(form => {


    const today = new Date().toISOString().split("T")[0];


    const checkin = form.querySelector('[name="checkin"]');
    const checkout = form.querySelector('[name="checkout"]');


    if (checkin) checkin.min = today;


    if (checkin && checkout) {
      checkin.addEventListener("change", () => {
        checkout.min = checkin.value;
        if (checkout.value && checkout.value <= checkin.value) {
          checkout.value = "";
        }
      });
    }


    form.addEventListener("submit", event => {
      event.preventDefault();


      if (!form.reportValidity()) return;


      const data = Object.fromEntries(
        new FormData(form).entries()
      );


      if (data.checkout <= data.checkin) {
        alert("Check-out date must be after check-in date.");
        return;
      }


      const message =
`Hello Hotel Fortune Suites,


I would like to enquire about a booking.


Name: ${data.name}
Phone: ${data.phone}
Check-in: ${data.checkin}
Check-out: ${data.checkout}
Guests: ${data.guests}
Room preference: ${data.room}
Message: ${data.message || "No additional message"}


Please share availability and rates.`;


      window.open(
        WA_URL + "?text=" + encodeURIComponent(message),
        "_blank",
        "noopener"
      );
    });
  });


  // Dynamic footer
  const footer = document.querySelector("#footer");


  if (footer) {
    footer.className = "site-footer";


    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">


          <div>
            <a class="logo" href="index.html" style="color:white">
              <span class="logo-icon">F</span>
              <span>FORTUNE SUITES
                <small>HOTEL · PRAYAGRAJ</small>
              </span>
            </a>
            <p>
              A welcoming stay in Naini, Prayagraj.
              Connect with our team for room enquiries
              and booking assistance.
            </p>
          </div>


          <div>
            <h3>Explore</h3>
            <p>
              <a href="rooms.html">Rooms & Suites</a><br>
              <a href="facilities.html">Facilities</a><br>
              <a href="gallery.html">Gallery</a><br>
              <a href="about.html">About the Hotel</a>
            </p>
          </div>


          <div>
            <h3>Get in Touch</h3>
            <p>
              Hotel Fortune Suites<br>
              Naini, Prayagraj, Uttar Pradesh<br>
              <a href="tel:+918840226276">+91 88402 26276</a><br>
              <a href="${MAP_URL}" target="_blank">Open Google Maps ↗</a>
            </p>
          </div>


        </div>


        <div class="footer-bottom">
          <span>
            © ${new Date().getFullYear()} Hotel Fortune Suites.
            All rights reserved.
          </span>
          <span>Website crafted by <strong>DestiQora</strong></span>
        </div>
      </div>
    `;
  }


});

