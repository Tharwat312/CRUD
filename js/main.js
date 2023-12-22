// VARIABLES DECLERATION
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCateg = document.getElementById("productCateg");
var productDesc = document.getElementById("productDesc");
var productList = [];
var productIndex;
var btnAdd = document.getElementById("btnAdd");
var btnUpdate = document.getElementById("btnUpdate");
if (localStorage.getItem("products") != null) {
    productList = JSON.parse(localStorage.getItem("products"));
    displayProduct(productList);
}
function addProduct() {
    if (validateProductName() == true && validateProductCategory() == true && validateProductPrice() == true && validProductDescription() == true) {
        var product = {
            name: productName.value,
            price: productPrice.value,
            categ: productCateg.value,
            desc: productDesc.value
        }
        productList.push(product);
        localStorage.setItem("products", JSON.stringify(productList));
        displayProduct(productList);
        updateFormValues();
    }
    else {
        alert("Invalid values!");
    }
}
function displayProduct(arr) {
    var cartona = ``;
    for (var i = 0; i < arr.length; i++) {
        cartona += `
        <tr>
            <td>${i+1}</td>
            <td>${arr[i].foundName ? arr[i].foundName : arr[i].name}</td>
            <td>${arr[i].price}</td>
            <td>${arr[i].categ}</td>
            <td class="productdescription">${arr[i].desc}</td>
            <td><button onclick="updateProduct(${i})" class="btn btn-warning btn-sm">update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">delete</button></td>
        </tr>`;    
    }
    document.getElementById("tData").innerHTML = cartona;

}
function updateFormValues(flag) {
    productName.value = flag ? flag.name : "";
    productPrice.value = flag ? flag.price : "";
    productCateg.value = flag ? flag.categ : "";
    productDesc.value = flag ? flag.desc : "";
}
function deleteProduct(index) {
    productList.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(productList));
    displayProduct(productList);
}

function searchItemByName(word) {
    var cartona = ``;
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(word.toLowerCase()) == true) {
            productList[i].foundName = productList[i].name.toLowerCase().replace(word, `<span class="text-danger">${word}</span>`);
            cartona += `
            <tr>
                <td>${i+1}</td>
                <td>${productList[i].foundName}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].categ}</td>
                <td class="productdescription">${productList[i].desc}</td>
                <td><button onclick="updateProduct(${i})" class="btn btn-warning btn-sm">update</button></td>
                <td><button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">delete</button></td>
            </tr>`;    
        }
    };
    document.getElementById("tData").innerHTML = cartona;
}

function updateProduct(index) {
    updateFormValues(productList[index]);
    productIndex = index;
    btnAdd.classList.replace("d-block", "d-none");
    btnUpdate.classList.replace("d-none", "d-block");
    scroll({
        top: 100,
        behavior: "smooth",
    })
}
function updateProductValue() {
    if (validateProductName() == true && validateProductCategory() == true && validateProductPrice() == true && validProductDescription() == true) {
        var productUpdated = {
            name: productName.value,
            price: productPrice.value,
            categ: productCateg.value,
            desc: productDesc.value
        }
        productList.splice(productIndex, 1, productUpdated);
        displayProduct(productList);
        localStorage.setItem("products", JSON.stringify(productList));
        btnAdd.classList.replace("d-none", "d-block");
        btnUpdate.classList.replace("d-block", "d-none");
        updateFormValues();
    }
    else {
        alert("Invalid values!");
    }
}
function validateProductName() {
    var regex = /^[A-Z][A-Za-z]{1,9}$/;
    if (regex.test(productName.value) == true) {
        productName.classList.remove("invalid");
        document.getElementById("invalidName").classList.replace("d-block", "d-none");
        return true;
    }
    else {
        productName.classList.add("invalid");
        document.getElementById("invalidName").classList.replace("d-none", "d-block");
        return false;
    }
}

function validateProductPrice() {
    var regex = /^([1-9][0-9]{3}|10000)$/;
    if (regex.test(productPrice.value) == true) {
        productPrice.classList.remove("invalid");
        document.getElementById("invalidPrice").classList.replace("d-block", "d-none");
        return true;
    }
    else {
        productPrice.classList.add("invalid");
        document.getElementById("invalidPrice").classList.replace("d-none", "d-block");
        return false;
    }
}
function validateProductCategory() {
    var regex = /^(\blaptop)|(\bmobile)|\b(tv)$/i;
    if (regex.test(productCateg.value) == true) {
        productCateg.classList.remove("invalid");
        document.getElementById("invalidCateg").classList.replace("d-block", "d-none");
        return true;
    }
    else {
        productCateg.classList.add("invalid");
        document.getElementById("invalidCateg").classList.replace("d-none", "d-block");
        return false;
    }
}
function validProductDescription() {
    var regex = /^[a-z0-9 ]{49,400}$/gmi;
    if (regex.test(productDesc.value) == true) {
        productDesc.classList.remove("invalid");
        document.getElementById("invalidDesc").classList.replace("d-block", "d-none");
        return true;
    }
    else {
        productDesc.classList.add("invalid");
        document.getElementById("invalidDesc").classList.replace("d-none", "d-block");
        return false;
    }
}

