let head = document.getElementById('container');
let title = document.getElementById('title')
let price = document.getElementById('price')
let ads = document.getElementById('ads')
let taxes = document.getElementById('taxes')
let discount = document.getElementById('discount')
let count = document.getElementById('count')
let submit = document.getElementById('submit')
let catagory = document.getElementById('catagory')
let total = document.getElementById('total')
let mod = 'create';
// this is smart
let tmp;


// console.log(title,price,ads,discount,count,submit,catagory);

// get total
function getTotal() {
    // console.log("done");
    if (price.value != '') {
        // + is to turn it to string
        let res = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = res;

        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = 'red';
    }

}

// create product
// save local storage
let datapro
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product)
} else {
    datapro = [];
}


submit.onclick = function () {
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        catagory: catagory.value.toLowerCase(),
    }
    if (title.value != '' && price.value != '' && catagory.value != ''&&count.value<100) {
        if (mod == 'create') {
            if (newProduct.count > 1) {

                for (let c = 0; c < newProduct.count; c++) {
                    datapro.push(newProduct)
                }
            } else {
                datapro.push(newProduct)
            }

        } else {
            datapro[tmp] = newProduct
            mod = 'create'
            submit.innerHTML = 'Create'
            count.style.display = 'none'
        }
        clearData();

    }


    localStorage.setItem('product', JSON.stringify(datapro))
    console.log(datapro);
    ShowData()
}

// clear input
function clearData() {
    title.value = ''; price.value = ''; taxes.value = ''; ads.value = ''; catagory.value = ''; discount.value = ''; total.innerHTML = ''; count.value = ''; total.style.background = 'red';

}
// read
ShowData();
function ShowData() {
    getTotal()
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        // table = datapro[i];
        table += `
            <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].catagory}</td>
        <td><button id="update" onclick='UpdateData(${i})   ' >update</button></td>
        <td><button onclick='deletePro(${i})' id="delete">delete</button></td>
    </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table
    let btndeleteall = document.getElementById("deleteAll")
    // count
    if (datapro.length > 0) {
        btndeleteall.innerHTML = `
        <td><button id="deleteall" onclick='DeleteAll()'>Delete All (${datapro.length})</button></td>   `
    } else {
        btndeleteall.innerHTML = '';
    }
}


// delete
function deletePro(i) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro)
    ShowData()
}
// delete all date
function DeleteAll() {
    localStorage.clear()
    datapro.splice(0)

    ShowData()
}
// update
function UpdateData(i) {
    mod = 'update'
    title.value = datapro[i].title
    price.value = datapro[i].price
    taxes.value = datapro[i].taxes
    ads.value = datapro[i].ads
    count.value = datapro[i].count
    count.style.display = 'none'
    catagory.value = datapro[i].catagory
    discount.value = datapro[i].discount
    submit.innerHTML = 'Update'
    tmp = i
    getTotal()
    scroll({
        top: 0,
        behavior: "smooth",
    })
}
// search
let searchMod = 'title'
function GetSearchMod(id) {
    let search = document.getElementById('search')

    if (id == 'searchtitle') {
        searchMod = 'title'
        search.value = ''
    } else {
        searchMod = 'catagory'
        search.value = ''
    }
    search.placeholder = 'Please enter ' + searchMod + '...'

    search.focus()

}

function SearchData(value) {
    let table = '';

    for (let index = 0; index < datapro.length; index++) {
        if (searchMod == 'title') {
            if (datapro[index].title.includes(value.toLowerCase())) {
                table += `
                <tr>
            <td>${index}</td>
            <td>${datapro[index].title}</td>
            <td>${datapro[index].price}</td>
            <td>${datapro[index].taxes}</td>
            <td>${datapro[index].ads}</td>
            <td>${datapro[index].discount}</td>
            <td>${datapro[index].total}</td>
            <td>${datapro[index].catagory}</td>
            <td><button id="update" onclick='UpdateData(${index})   ' >update</button></td>
            <td><button onclick='deletePro(${index})' id="delete">delete</button></td>
        </tr>
            `
            }

        }


        else {
            if (datapro[index].catagory.includes(value.toLowerCase())) {
                table += `
                <tr>
            <td>${index}</td>
            <td>${datapro[index].title}</td>
            <td>${datapro[index].price}</td>
            <td>${datapro[index].taxes}</td>
            <td>${datapro[index].ads}</td>
            <td>${datapro[index].discount}</td>
            <td>${datapro[index].total}</td>
            <td>${datapro[index].catagory}</td>
            <td><button id="update" onclick='UpdateData(${index})   ' >update</button></td>
            <td><button onclick='deletePro(${index})' id="delete">delete</button></td>
        </tr>
            `
            }

        }
    }
    document.getElementById('tbody').innerHTML = table

}