document.addEventListener("DOMContentLoaded", function () {
  let isEditing = false; // Biến kiểm tra trạng thái chỉnh sửa hoặc thêm mới

  // Xử lý nút "Cập nhật" cho từng sản phẩm
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (isEditing) return; // Nếu đang chỉnh sửa hoặc thêm mới thì thoát

      const productCard = button.closest(".product-card");
      const productName = productCard.querySelector("h3").textContent;
      const productPrice =
        productCard.querySelector("p:nth-of-type(1)").textContent;
      const productStatus =
        productCard.querySelector("p:nth-of-type(2)").textContent;

      // Đặt trạng thái đang chỉnh sửa
      isEditing = true;

      // Hiển thị form để chỉnh sửa
      const editForm = document.createElement("div");
      editForm.classList.add("edit-form");
      editForm.innerHTML = `
                <label>Tên sản phẩm:</label>
                <input type="text" value="${productName}">
                <label>Giá:</label>
                <input type="text" value="${productPrice}">
                <label>Trạng thái:</label>
                <input type="text" value="${productStatus}">
                <button class="save-btn">Lưu</button>
                <button class="cancel-btn">Hủy</button>
            `;
      productCard.appendChild(editForm);

      // Xử lý khi nhấn "Lưu"
      editForm
        .querySelector(".save-btn")
        .addEventListener("click", function () {
          const newName = editForm.querySelector(
            'input[type="text"]:nth-of-type(1)'
          ).value;
          const newPrice = editForm.querySelector(
            'input[type="text"]:nth-of-type(2)'
          ).value;
          const newStatus = editForm.querySelector(
            'input[type="text"]:nth-of-type(3)'
          ).value;

          productCard.querySelector("h3").textContent = newName;
          productCard.querySelector("p:nth-of-type(1)").textContent = newPrice;
          productCard.querySelector("p:nth-of-type(2)").textContent = newStatus;

          editForm.remove();
          isEditing = false; // Đặt lại trạng thái để có thể chỉnh sửa tiếp
        });

      // Xử lý khi nhấn "Hủy"
      editForm
        .querySelector(".cancel-btn")
        .addEventListener("click", function () {
          editForm.remove();
          isEditing = false; // Đặt lại trạng thái để có thể chỉnh sửa tiếp
        });
    });
  });

  // Xử lý "Thêm sản phẩm mới"
  const addNewButton = document.querySelector(".product-card.add-new");
  addNewButton.addEventListener("click", function () {
    if (isEditing) return; // Nếu đang chỉnh sửa hoặc thêm mới thì không hiển thị form thêm mới

    // Đặt trạng thái đang thêm mới
    isEditing = true;

    const newProductForm = document.createElement("div");
    newProductForm.classList.add("new-product-form");
    newProductForm.innerHTML = `
            <label>Tên sản phẩm:</label>
            <input type="text" placeholder="Nhập tên sản phẩm">
            <label>Giá:</label>
            <input type="text" placeholder="Nhập giá sản phẩm">
            <label>Trạng thái:</label>
            <input type="text" placeholder="Nhập trạng thái sản phẩm">
            <label>Hình ảnh:</label>
            <input type="file" class="product-image-input" accept="image/*">
            <img class="preview-image" style="display: none; max-width: 100px; margin-top: 10px;">
            <button class="add-btn">Thêm</button>
            <button class="cancel-btn">Hủy</button>
        `;
    addNewButton.parentElement.appendChild(newProductForm);

    const imageInput = newProductForm.querySelector(".product-image-input");
    const previewImage = newProductForm.querySelector(".preview-image");

    // Hiển thị ảnh xem trước khi chọn ảnh
    imageInput.addEventListener("change", function () {
      const file = imageInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          previewImage.src = e.target.result;
          previewImage.style.display = "block";
        };
        reader.readAsDataURL(file);
      }
    });

    // Xử lý khi nhấn "Thêm"
    newProductForm
      .querySelector(".add-btn")
      .addEventListener("click", function () {
        const newName = newProductForm.querySelector(
          'input[type="text"]:nth-of-type(1)'
        ).value;
        const newPrice = newProductForm.querySelector(
          'input[type="text"]:nth-of-type(2)'
        ).value;
        const newStatus = newProductForm.querySelector(
          'input[type="text"]:nth-of-type(3)'
        ).value;
        const newImageSrc = previewImage.src;

        const newProductCard = document.createElement("div");
        newProductCard.classList.add("product-card");
        newProductCard.innerHTML = `
                <div class="product-info">
                    <img src="${newImageSrc}" alt="Sản phẩm mới" />
                    <h3>${newName}</h3>
                    <p>Giá: ${newPrice}</p>
                    <p>Trạng thái: ${newStatus}</p>
                </div>
                <div class="product-actions">
                    <button class="edit-btn">Cập nhật</button>
                </div>
            `;
        addNewButton.before(newProductCard);

        newProductForm.remove();
        isEditing = false; // Đặt lại trạng thái để có thể thêm sản phẩm tiếp theo
      });

    // Xử lý khi nhấn "Hủy"
    newProductForm
      .querySelector(".cancel-btn")
      .addEventListener("click", function () {
        newProductForm.remove();
        isEditing = false; // Đặt lại trạng thái để có thể thêm sản phẩm tiếp theo
      });
  });
});
