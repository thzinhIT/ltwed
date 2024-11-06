// // Chức năng hiển thị hộp thoại khi vào trang
// window.onload = function () {
//   setTimeout(function () {
//     let answer = confirm("Bạn đã có tài khoản chưa?");
//     if (answer) {
//       openLoginModal();
//     } else {
//       openSignupModal();
//     }
//   }, 500); // Hỏi sau khi trang tải xong 0.5 giây
// };

// // Chức năng mở modal Đăng nhập
// function openLoginModal() {
//     document.getElementById('login-modal').style.display = 'block';
// }

// // Chức năng mở modal Đăng ký
// function openSignupModal() {
//     document.getElementById('signup-modal').style.display = 'block';
// }

// Đóng các modal khi nhấn vào nút "X"
document.querySelectorAll(".modal .close").forEach(function (btn) {
  btn.addEventListener("click", function () {
    btn.closest(".modal").style.display = "none";
  });
});

// Chuyển đổi giữa các phần (Điện thoại, Phụ kiện, Hỗ trợ)
document.querySelectorAll("nav a").forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Ngăn điều hướng mặc định

    // Ẩn tất cả các phần
    document.querySelectorAll(".hidden-section").forEach(function (section) {
      section.classList.remove("visible-section");
      section.classList.add("hidden-section");
    });

    // Xác định và hiển thị phần tương ứng
    let sectionId = "";
    if (link.textContent === "Điện thoại") {
      sectionId = "phones-section";
    } else if (link.textContent === "Phụ kiện") {
      sectionId = "accessories-section";
    } else if (link.textContent === "Hỗ trợ") {
      sectionId = "support-section";
    }

    document.getElementById(sectionId).classList.remove("hidden-section");
    document.getElementById(sectionId).classList.add("visible-section");
  });
});
// chức xem thêm sản phẩm.

function toggleProducts() {
  const hiddenProducts = document.querySelectorAll(".product-card.hidden");
  const toggleButton = document.getElementById("toggleButton");

  if (toggleButton.innerText === "Xem thêm") {
    // Hiển thị sản phẩm và đổi nút thành "Ẩn bớt"
    hiddenProducts.forEach((product) => {
      product.classList.remove("hidden");
    });
  }
}

// Chức năng thêm sản phẩm vào giỏ hàng
let cartItems = [];
document.querySelectorAll(".add-to-cart").forEach(function (button) {
  button.addEventListener("click", function () {
    let productCard = button.closest(".product-card");
    let productName = productCard.querySelector("h3").textContent;

    let productPriceText = productCard.querySelector("p").textContent; // Ví dụ: "Giá: 2,590,000 VNĐ"

    // Loại bỏ phần "Giá: " và "VNĐ", đồng thời loại bỏ dấu phẩy
    let productPrice = productPriceText
      .replace("Giá: ", "") // Loại bỏ "Giá: "
      .replace(" VNĐ", "") // Loại bỏ " VNĐ"
      .replace(/,/g, ""); // Loại bỏ dấu phẩy

    // Chuyển đổi chuỗi thành số
    productPrice = parseInt(productPrice);
    let productImage = productCard.querySelector("img").getAttribute("src");

    // Kiểm tra xem sản phẩm đã có trong giỏ chưa
    let existingProduct = cartItems.find((item) => item.name === productName);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cartItems.push({
        name: productName,
        price: parseInt(productPrice),
        quantity: 1,
        image: productImage,
      });
    }

    // Cập nhật giỏ hàng
    updateCart();
  });
});

// Cập nhật giỏ hàng trong modal
function updateCart() {
  let cartTableBody = document.getElementById("cart-items");
  cartTableBody.innerHTML = "";

  let totalAmount = 0;

  cartItems.forEach(function (item) {
    let totalItemPrice = item.price * item.quantity;
    totalAmount += totalItemPrice;

    // Thêm sản phẩm vào bảng giỏ hàng với ảnh
    let row = `
            <tr>
                <td>
                    <div class="product-info">
                        <img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto; margin-right: 10px;">
                        <span>${item.name}</span>
                    </div>
                </td>
                <td>${item.quantity}</td>
                <td>${item.price} VNĐ</td>
                <td>${totalItemPrice} VNĐ</td>
            </tr>
        `;
    cartTableBody.innerHTML += row;
  });

  // Cập nhật tổng số tiền
  document.getElementById("total-amount").textContent = totalAmount + " VNĐ";
}

// Mở modal giỏ hàng
document.querySelector(".cart a").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("cart-modal").style.display = "block";
});

// Đóng modal giỏ hàng
document
  .getElementById("close-cart-modal")
  .addEventListener("click", function () {
    document.getElementById("cart-modal").style.display = "none";
  });

// Thanh toán
document.getElementById("checkout-btn").addEventListener("click", function () {
  document.getElementById("cart-modal").style.display = "none";
  openCheckoutModal();
});

// Mở modal Thanh toán
function openCheckoutModal() {
  let totalAmount = document.getElementById("total-amount").textContent;
  document.getElementById("checkout-total").textContent = totalAmount;
  document.getElementById("checkout-modal").style.display = "block";
}

// Xử lý khi người dùng gửi thông tin thanh toán
document
  .querySelector("#checkout-modal form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Thanh toán thành công!");
    document.getElementById("checkout-modal").style.display = "none";
    cartItems = []; // Làm trống giỏ hàng sau khi thanh toán
    updateCart(); // Cập nhật lại giỏ hàng
  });

// Xử lý đăng nhập
document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Bạn có thể thêm xử lý đăng nhập ở đây (ví dụ: kiểm tra email, mật khẩu)

    // Giả sử quá trình đăng nhập thành công:
    alert("Đăng nhập thành công!");

    // Ẩn modal đăng nhập
    document.getElementById("login-modal").style.display = "none";

    // Thay đổi giao diện sau khi đăng nhập
    document.getElementById("login-link").style.display = "none"; // Ẩn liên kết Đăng nhập
    document.getElementById("signup-link").style.display = "none"; // Ẩn liên kết Đăng ký
    document.getElementById("user-avatar").style.display = "block"; // Hiển thị avatar
    document.getElementById("logout-link").style.display = "inline"; // Hiển thị nút Đăng xuất

    // Tùy chọn: Đổi avatar cho người dùng (nếu có ảnh từ backend)
    // document.getElementById('avatar-img').src = 'path_to_user_avatar.jpg';
  });
//Đăng xuất//
document
  .getElementById("logout-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    alert("Đăng xuất thành công!");

    // Hiển thị lại các liên kết Đăng nhập và Đăng ký
    document.getElementById("login-link").style.display = "inline";
    document.getElementById("signup-link").style.display = "inline";

    // Ẩn avatar và nút Đăng xuất
    document.getElementById("user-avatar").style.display = "none";
    document.getElementById("logout-link").style.display = "none";
  });

// Xử lý đăng ký
document
  .getElementById("signup-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Bạn có thể thêm xử lý đăng ký ở đây (ví dụ: lưu thông tin tài khoản)
    alert("Đăng ký thành công!");
    document.getElementById("signup-modal").style.display = "none";
  });

// Chuyển đổi giữa đăng nhập và đăng ký
document
  .getElementById("login-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    openLoginModal();
  });

document
  .getElementById("signup-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    openSignupModal();
  });

document
  .getElementById("open-signup")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("login-modal").style.display = "none";
    openSignupModal();
  });

document
  .getElementById("open-login")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("signup-modal").style.display = "none";
    openLoginModal();
  });
// Tạo sự kiện cho các liên kết trong menu
// Chuyển đổi giữa các phần (Điện thoại, Phụ kiện, Hỗ trợ)
document.querySelectorAll("nav a").forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Ngăn điều hướng mặc định

    // Ẩn tất cả các phần
    document
      .querySelectorAll(".hidden-section, .visible-section")
      .forEach(function (section) {
        section.classList.remove("visible-section");
        section.classList.add("hidden-section");
      });

    // Xác định và hiển thị phần tương ứng
    let sectionId = "";
    if (link.textContent === "Điện thoại") {
      sectionId = "phones-section";
    } else if (link.textContent === "Phụ kiện") {
      sectionId = "accessories-section";
    } else if (link.textContent === "Hỗ trợ") {
      sectionId = "support-section";
    }

    document.getElementById(sectionId).classList.remove("hidden-section");
    document.getElementById(sectionId).classList.add("visible-section");
  });
});
// lưu trạng thái đăng nhập//
if (localStorage.getItem("loggedIn")) {
  // Người dùng đã đăng nhập, cập nhật giao diện
  document.getElementById("login-link").style.display = "none";
  document.getElementById("signup-link").style.display = "none";
  document.getElementById("user-avatar").style.display = "block";
  document.getElementById("logout-link").style.display = "inline";
}

document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    localStorage.setItem("loggedIn", true); // Lưu trạng thái đăng nhập
  });

document
  .getElementById("logout-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.removeItem("loggedIn"); // Xóa trạng thái đăng nhập
  });
// document.addEventListener("DOMContentLoaded", () => {
//   // Lấy tất cả các sản phẩm
//   const productCards = document.querySelectorAll(".product-card");
//   const productDetailModal = document.getElementById("product-detail-modal");
//   const closeProductDetail = document.getElementById("close-product-detail");

//   // Các phần tử trong modal chi tiết sản phẩm
//   const mainProductImage = document.getElementById("product-detail-main-image");
//   const productName = document.getElementById("product-detail-name");
//   const productPrice = document.getElementById("product-detail-price");
//   const productDescription = document.getElementById(
//     "product-detail-description"
//   );
//   const productRating = document.getElementById("product-detail-rating");

//   const thumbnails = document.querySelectorAll(".product-detail-thumbnail");
//   let currentImageIndex = 0;
//   const imageSources = Array.from(thumbnails).map((thumbnail) => thumbnail.src);

//   // Nút chuyển ảnh
//   const prevBtn = document.createElement("div");
//   prevBtn.className = "prev";
//   prevBtn.innerHTML = "&#10094;";
//   const nextBtn = document.createElement("div");
//   nextBtn.className = "next";
//   nextBtn.innerHTML = "&#10095;";

//   document.querySelector(".product-detail-images").append(prevBtn, nextBtn);

//   function showImage(index) {
//     mainProductImage.src = imageSources[index];
//   }

//   nextBtn.addEventListener("click", () => {
//     currentImageIndex = (currentImageIndex + 1) % imageSources.length;
//     showImage(currentImageIndex);
//   });

//   prevBtn.addEventListener("click", () => {
//     currentImageIndex =
//       (currentImageIndex - 1 + imageSources.length) % imageSources.length;
//     showImage(currentImageIndex);
//   });

//   // Mở modal và hiển thị chi tiết sản phẩm
//   productCards.forEach((card) => {
//     card.addEventListener("click", () => {
//       // Lấy dữ liệu từ thẻ sản phẩm
//       const name = card.querySelector("h3").innerText;
//       const price = card.querySelector("p").innerText;
//       const imageSrc = card.querySelector("img").src;

//       // Cập nhật thông tin trong modal
//       productName.innerText = name;
//       productPrice.innerText = price;
//       mainProductImage.src = imageSrc;

//       // Mô tả và đánh giá giả lập
//       productDescription.innerText =
//         "Mô tả chi tiết về sản phẩm " + name + " tại đây...";
//       productRating.innerText = "4.5/5"; // Đánh giá giả lập
//       mainProductImage;

//       // Hiển thị modal chi tiết sản phẩm
//       productDetailModal.style.display = "flex";

//       // Đặt ảnh chính là ảnh đầu tiên
//       currentImageIndex = 0;
//       showImage(currentImageIndex);
//     });
//   });

//   // Đóng modal chi tiết sản phẩm
//   closeProductDetail.addEventListener("click", () => {
//     productDetailModal.style.display = "none";
//   });

//   // Đổi hình ảnh khi nhấp vào hình thu nhỏ
//   thumbnails.forEach((thumbnail, index) => {
//     thumbnail.addEventListener("click", () => {
//       currentImageIndex = index;
//       showImage(currentImageIndex);
//     });
//   });

//   // Đóng modal khi nhấp bên ngoài nội dung modal
//   window.addEventListener("click", (e) => {
//     if (e.target === productDetailModal) {
//       productDetailModal.style.display = "none";
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const productCards = document.querySelectorAll(".product-card");
  const productDetailModal = document.getElementById("product-detail-modal");
  const closeProductDetail = document.getElementById("close-product-detail");

  // Các phần tử trong modal chi tiết sản phẩm
  const mainProductImage = document.getElementById("product-detail-main-image");
  const productName = document.getElementById("product-detail-name");
  const productPrice = document.getElementById("product-detail-price");
  const productDescription = document.getElementById(
    "product-detail-description"
  );

  productCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Lấy dữ liệu từ thẻ sản phẩm
      const name = card.querySelector("h3").innerText;
      const price = card.querySelector("p").innerText;
      const imageSrc = card.querySelector("img").src; // Lấy src của ảnh trong card

      // Cập nhật thông tin trong modal
      productName.innerText = name;
      productPrice.innerText = price;
      mainProductImage.src = imageSrc; // Gán hình ảnh vào modal
      productDescription.innerText = `Mô tả chi tiết về sản phẩm ${name} tại đây...`;

      // Hiển thị modal
      productDetailModal.style.display = "flex";
    });
  });

  // Đóng modal khi nhấn vào nút đóng
  closeProductDetail.addEventListener("click", () => {
    productDetailModal.style.display = "none";
  });

  // Đóng modal khi nhấn bên ngoài nội dung modal
  window.addEventListener("click", (e) => {
    if (e.target === productDetailModal) {
      productDetailModal.style.display = "none";
    }
  });
});

// document.addEventListener("DOMContentLoaded", () => {
//   // Cập nhật lại phần này để lấy dữ liệu từ các bộ lọc
//   const brandFilter = document.getElementById("brand-filter");
//   const priceFilter = document.getElementById("price-filter");

//   // Gọi hàm lọc mỗi khi người dùng thay đổi lựa chọn
//   brandFilter.addEventListener("change", filterProducts);
//   priceFilter.addEventListener("change", filterProducts);

//   function filterProducts() {
//     const selectedBrand = brandFilter.value;
//     const selectedPriceRange = priceFilter.value;
//     const productCards = document.querySelectorAll(".product-card");

//     productCards.forEach((card) => {
//       const productBrand = card.getAttribute("data-brand"); // Giả định rằng các sản phẩm có thuộc tính data-brand
//       const productPrice = parseInt(card.getAttribute("data-price")); // Giả định rằng các sản phẩm có thuộc tính data-price

//       let brandMatch =
//         selectedBrand === "all" || productBrand === selectedBrand;
//       let priceMatch = false;

//       if (selectedPriceRange === "all") {
//         priceMatch = true;
//       } else if (selectedPriceRange === "0-500000" && productPrice < 500000) {
//         priceMatch = true;
//       } else if (
//         selectedPriceRange === "500000-1000000" &&
//         productPrice >= 500000 &&
//         productPrice <= 1000000
//       ) {
//         priceMatch = true;
//       } else if (
//         selectedPriceRange === "1000000-2000000" &&
//         productPrice >= 1000000 &&
//         productPrice <= 2000000
//       ) {
//         priceMatch = true;
//       } else if (selectedPriceRange === "2000000" && productPrice > 2000000) {
//         priceMatch = true;
//       }

//       // Hiển thị hoặc ẩn sản phẩm tùy vào kết quả lọc
//       if (brandMatch && priceMatch) {
//         card.style.display = "block";
//       } else {
//         card.style.display = "none";
//       }
//     });
//   }
// });

// Lấy các thẻ select cho bộ lọc
const brandFilter = document.getElementById("brandFilter");
const priceFilter = document.getElementById("priceFilter");

// Lắng nghe sự kiện thay đổi của bộ lọc
brandFilter.addEventListener("change", filterProducts);
priceFilter.addEventListener("change", filterProducts);

function filterProducts() {
  const selectedBrand = brandFilter.value;
  const selectedPriceRange = priceFilter.value;
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    // Lấy thương hiệu và giá từ thuộc tính data của mỗi thẻ sản phẩm
    const productBrand = card.getAttribute("data-brand");
    const productPrice = parseInt(card.getAttribute("data-price"));

    // Kiểm tra thương hiệu có khớp với lựa chọn không
    let brandMatch = selectedBrand === "all" || productBrand === selectedBrand;

    // Kiểm tra giá có khớp với khoảng giá đã chọn không
    let priceMatch = false;
    if (selectedPriceRange === "all") {
      priceMatch = true;
    } else if (selectedPriceRange === "0-500000" && productPrice < 500000) {
      priceMatch = true;
    } else if (
      selectedPriceRange === "500000-1000000" &&
      productPrice >= 500000 &&
      productPrice <= 1000000
    ) {
      priceMatch = true;
    } else if (
      selectedPriceRange === "1000000-2000000" &&
      productPrice >= 1000000 &&
      productPrice <= 2000000
    ) {
      priceMatch = true;
    } else if (selectedPriceRange === "2000000" && productPrice > 2000000) {
      priceMatch = true;
    }

    // Hiển thị hoặc ẩn sản phẩm dựa trên kết quả lọc
    if (brandMatch && priceMatch) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
// Lắng nghe nút "Mua ngay"
document.querySelectorAll(".product-card a").forEach((buyNowButton) => {
  buyNowButton.addEventListener("click", function (event) {
    event.preventDefault();

    // Lấy thông tin của sản phẩm liên quan
    const productCard = this.closest(".product-card");
    const productName = productCard.querySelector("h3").textContent;
    const productPrice = productCard.querySelector("p").textContent;

    // Hiển thị thông tin sản phẩm trong modal thanh toán
    document.getElementById("checkout-total").textContent = productPrice;

    // Hiển thị modal thanh toán
    document.getElementById("checkout-modal").style.display = "block";
  });
});

// Đóng modal thanh toán
document
  .getElementById("checkout-modal")
  .querySelector(".modal-content form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Thanh toán thành công!");
    document.getElementById("checkout-modal").style.display = "none";
  });

/* tìm kiếm*/
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const productCards = document.querySelectorAll(".product-card");
const noResultsMessage = document.getElementById("no-results");

function searchProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  let hasResults = false;

  productCards.forEach((card) => {
    const productNameElement = card.querySelector("h3");
    const productName = productNameElement.textContent.toLowerCase();

    if (productName.includes(searchTerm)) {
      card.style.display = "block";
      hasResults = true;

      // Làm nổi bật từ khóa trong tên sản phẩm
      const regex = new RegExp(`(${searchTerm})`, "gi");
      const highlightedName = productNameElement.textContent.replace(
        regex,
        (match) => `<span class="highlight">${match}</span>`
      );
      productNameElement.innerHTML = highlightedName;
    } else {
      card.style.display = "none";
      // Trả lại tên gốc (không làm nổi bật) nếu không khớp
      productNameElement.innerHTML = productNameElement.textContent;
    }
  });

  // Hiển thị thông báo nếu không có kết quả
  noResultsMessage.style.display = hasResults ? "none" : "block";
}

// Kích hoạt tìm kiếm khi nhấn nút
searchButton.addEventListener("click", searchProducts);

// Tự động lọc khi người dùng nhập
searchInput.addEventListener("input", searchProducts);
/*herro*/
let slideIndex = 0;
showSlides();

function showSlides() {
  const slides = document.querySelectorAll(".slide");

  slides.forEach((slide) => (slide.style.display = "none"));

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";

  // Chuyển slide sau mỗi 5 giây
  setTimeout(showSlides, 5000);
}

function plusSlides(n) {
  slideIndex += n;
  const slides = document.querySelectorAll(".slide");
  if (slideIndex < 1) {
    slideIndex = slides.length;
  } else if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides.forEach((slide) => (slide.style.display = "none"));
  slides[slideIndex - 1].style.display = "block";
}

// main.js

document.addEventListener("DOMContentLoaded", function () {
  // Lấy các liên kết trong menu điều hướng
  const phonesLink = document.getElementById("phones-link");
  const accessoriesLink = document.getElementById("accessories-link");
  const supportLink = document.getElementById("support-link");

  // Lấy các section tương ứng
  const phonesSection = document.getElementById("phones-section");
  const accessoriesSection = document.getElementById("accessories-section");
  const supportSection = document.getElementById("support-section");

  // Hàm để xóa lớp active khỏi tất cả các liên kết
  function removeActiveClasses() {
    phonesLink.classList.remove("active-section");
    accessoriesLink.classList.remove("active-section");
    supportLink.classList.remove("active-section");
  }

  // Hàm để ẩn tất cả các section
  function hideAllSections() {
    phonesSection.classList.add("hidden-section");
    accessoriesSection.classList.add("hidden-section");
    supportSection.classList.add("hidden-section");
  }

  // Khi nhấn vào liên kết Điện thoại
  phonesLink.addEventListener("click", function (e) {
    e.preventDefault();
    removeActiveClasses();
    phonesLink.classList.add("active-section");
    hideAllSections();
    phonesSection.classList.remove("hidden-section");
  });

  // Khi nhấn vào liên kết Phụ kiện
  accessoriesLink.addEventListener("click", function (e) {
    e.preventDefault();
    removeActiveClasses();
    accessoriesLink.classList.add("active-section");
    hideAllSections();
    accessoriesSection.classList.remove("hidden-section");
  });

  // Khi nhấn vào liên kết Hỗ trợ
  supportLink.addEventListener("click", function (e) {
    e.preventDefault();
    removeActiveClasses();
    supportLink.classList.add("active-section");
    hideAllSections();
    supportSection.classList.remove("hidden-section");
  });
});
