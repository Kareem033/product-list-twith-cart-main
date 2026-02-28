function CopyRight() {
  let date = document.querySelector(".copyright #date");
  let year = new Date().getFullYear();
  if (date) {
    date.innerHTML = year;
  }
}
document.addEventListener("DOMContentLoaded", () => CopyRight());
// Bulid Content Start Here =>
axios
  .get("data.json")
  .then((response) => {
    let container = document.querySelector(".grid-wrap");
    for (let item of response.data) {
      let content_item = ` <article class="grid-item" data-name="${item.name}" data-price="${item.price}">
              <div class="button-container">
              <figure>
                <picture>
                  <source media="(max-width: 480px)" srcset="${item.image.mobile}">
                  <source media="(max-width: 1024px)" srcset="${item.image.tablet}">
                  <img src="${item.image.desktop}" alt="image ${item.name}">
                </picture>
              </figure>
                <button class="cart-button">
                  <span
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="20"
                      fill="none"
                      viewBox="0 0 21 20"
                    >
                      <g fill="#C73B0F" clip-path="url(#a)">
                        <path
                          d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"
                        />
                        <path
                          d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"
                        />
                      </g>
                      <defs>
                        <clipPath id="a">
                          <path fill="#fff" d="M.333 0h20v20h-20z" />
                        </clipPath>
                      </defs>
                    </svg> </span
                  >Add to Cart
                </button>
                <button class="cart-plus-minus">
                  <span class="access-hidden">Cart Quantity</span>
                  <span class="more-less">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="2"
                      fill="none"
                      viewBox="0 0 10 2"
                    >
                      <path d="M0 .375h10v1.25H0V.375Z" />
                    </svg>
                  </span>
                  <span class="item-quantity">1</span>
                  <span class="more-plus">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      fill="none"
                      viewBox="0 0 10 10"
                    >
                      <path
                        d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                      />
                    </svg>
                  </span>
                </button>
              </div>
              <div class="item-category">${item.category}</div>
              <div class="tertiary-header">${item.name}</div>
              <div class="price">$${item.price}</div>
            </article>`;
      container.insertAdjacentHTML("beforeend", content_item);
    }
    //   Container item Event =>
    let ul_side = document.querySelector(".sidebar-wrap ul");

    container.addEventListener("click", function (e) {
      let more_less = e.target.closest(".more-less");
      let more_plus = e.target.closest(".more-plus");
      let cart_button = e.target.closest(".cart-button");

      // Add item in Sidebar And Show Cart_Quantity
      if (cart_button) {
        let girdItem = cart_button.closest(".grid-item");

        // Show Cart_Quantity
        let cart_plus_minus = girdItem.querySelector(".cart-plus-minus");
        cart_plus_minus.style.display = "flex";

        let name_item = girdItem.dataset.name;
        let quantity = parseInt(
          girdItem.querySelector(".item-quantity").textContent,
        );

        // Add item in Sidebar
        let check_li = ul_side.querySelector(`li[data-name="${name_item}"]`);

        if (!check_li) {
          let price = girdItem.dataset.price;
          let total_item = price * quantity;

          ul_side.innerHTML += `<li data-price="${price}"  data-name="${name_item}" >
                <div>
                  <h4>${name_item}</h4>
                  <p>
                    <span class="quantity-item">${quantity}x</span>
                    <span class="price-item"
                      ><span class="icon-item">@</span>$${price}</span
                    >
                    <span class="price">$${total_item}</span>
                  </p>
                </div>
                <div class="remove-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    fill="none"
                    viewBox="0 0 10 10"
                  >
                    <path
                      d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                    />
                  </svg>
                </div>
              </li>`;
          // Total and Number of Cart
          document.querySelector(".final-price").textContent = Totalfinal();
          cart();
        }
      }
      // Increase or decrease the quantity of the product
      if (more_plus) {
        let girdItem = more_plus.closest(".grid-item");
        let quantity = girdItem.querySelector(".item-quantity");
        let currentValue = parseInt(quantity.textContent);
        quantity.textContent = currentValue + 1;
      }
      if (more_less) {
        let girdItem = more_less.closest(".grid-item");
        let name_item = girdItem.dataset.name;
        let quantity = girdItem.querySelector(".item-quantity");
        let currentValue = parseInt(quantity.textContent);
        if (currentValue > 0) {
          quantity.textContent = currentValue - 1;
        }
        if (currentValue - 1 <= 0) {
          girdItem.querySelector(".cart-plus-minus").style.display = "none";
          girdItem.querySelector(".item-quantity").textContent = "1";
          ul_side.querySelector(`li[data-name="${name_item}"]`).remove();
          cart();
          Totalfinal();
          return;
        }
      }

      // Total item
      if (more_less || more_plus) {
        let girdItem = (more_less || more_plus).closest(".grid-item");
        let quantity = parseInt(
          girdItem.querySelector(".item-quantity").textContent,
        );
        let price = parseFloat(girdItem.dataset.price);
        let total_item = quantity * price;
        let name_item = girdItem.querySelector(".tertiary-header").textContent;
        let check_li = ul_side.querySelector(`[data-name="${name_item}"]`);
        if (check_li && quantity > 0) {
          check_li.querySelector(".quantity-item").textContent = quantity + "x";
          check_li.querySelector(".price-item").innerHTML =
            `<span class="icon-item">@</span>$${price}`;
          check_li.querySelector(".price").textContent = "$" + total_item;
        } else if (!check_li && quantity > 0) {
          ul_side.innerHTML += `<li data-price="${price}"  data-name="${name_item}">
            <div>
              <h4>${name_item}</h4>
              <p>
                <span class="quantity-item">${quantity}x</span>
                <span class="price-item"
                  ><span class="icon-item">@</span>$${price}</span
                >
                <span class="price">$${total_item}</span>
              </p>
            </div>
            <div class="remove-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="none"
                viewBox="0 0 10 10"
              >
                <path
                  d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                />
              </svg>
            </div>
          </li>`;
        }
        document.querySelector(".final-price").textContent = Totalfinal();
      }
    });
    // Confirm Order Event =>
    let order = document.querySelector(".sidebar .button-order");

    order.addEventListener("click", function () {
      let check_li = ul_side.querySelector("li");
      let window_order = document.querySelector(".window-order");

      if (check_li) {
        window_order.classList.add("active");
        ul_side.querySelectorAll("li").forEach(function (item) {
          let name = item.dataset.name;
          let gridItem = document.querySelector(
            `.grid-item[data-name="${name}"]`,
          );
          let img = gridItem.querySelector("img").src;
          let quantity = parseInt(
            item.querySelector(".quantity-item").textContent,
          );
          let price_item = item.dataset.price;
          let total_price = parseFloat(
            item.querySelector(".price").textContent.replace("$", ""),
          );
          window_order.querySelector(
            ".container-order .ul-wrap ul",
          ).innerHTML += `   
            <li>
              <div class="content-order">
                <div class="image">
                  <img src="${img}" />
                </div>
                <div class="wrap-order">
                  <div class="name-order">${name}</div>
                  <div>
                    <span class="quantity-item-order">${quantity}x</span>
                    <span><span class="icon-price">@</span>$${price_item}</span>
                  </div>
                </div>
              </div>
              <div class="price-order">$${total_price}</div>
            </li>
          
        `;
          window_order.querySelector(
            ".info-total-order .price-total-order ",
          ).textContent = "$" + Totalfinal();
        });
      }
    });
    // Reset New Order

    let new_order = document.querySelector(".start-order");
    new_order.addEventListener("click", () => {
      ul_side.querySelectorAll("li").forEach((e) => {
        e.remove();
      });
      container.querySelectorAll(".cart-plus-minus").forEach((e) => {
        e.style.display = "none";
        e.querySelector(".item-quantity").textContent = "1";
      });
      let window_order = document.querySelector(".window-order");
      window_order.classList.remove("active");
      window_order.querySelectorAll("ul li").forEach((item) => {
        item.remove();
      });
      cart();
    });
    // remove Item Event =>
    ul_side.addEventListener("click", function (e) {
      let removeBtn = e.target.closest(".remove-icon");
      let attb_Name = removeBtn.closest("li").dataset.name;
      let girdItem = document.querySelector(
        `.grid-item[data-name = "${attb_Name}"]`,
      );

      if (removeBtn) {
        let li = removeBtn.closest("li");
        girdItem.querySelector(".cart-plus-minus").style.display = "none";
        girdItem.querySelector(".item-quantity").textContent = "1";
        li.remove();
        cart();
      }
      document.querySelector(".final-price").textContent = Totalfinal();
    });
    // Number OF Items
    function cart() {
      let numberCart = ul_side.querySelectorAll("li").length;
      document.querySelector(".secondary-header span").textContent = numberCart;
      if (numberCart === 0) {
        document.querySelector(".empty-cart").classList.add("active");
        document.querySelector(".cart-items").classList.remove("active");
      } else {
        document.querySelector(".cart-items").classList.add("active");
        document.querySelector(".empty-cart").classList.remove("active");
      }
    }
    cart();
    // Total Items
    function Totalfinal() {
      let total = 0;

      ul_side.querySelectorAll("li").forEach(function (item) {
        let price = parseFloat(item.dataset.price);
        let quantity = parseInt(
          item.querySelector(".quantity-item").textContent,
        );
        total += price * quantity;
      });

      return total.toFixed(2);
    }
  })
  .catch((error) => {
    console.error("Error", error);
  });
