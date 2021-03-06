
function sendCreatedPicture(picture) {
    return $.ajax({
        url: "php/main/main_picture.php",
        type: "POST",
        dataType: 'json',
        data: picture
    });
}

function sendUpdatedPicture(picture) {
    return $.ajax({
        url: "php/main/main_picture.php",
        type: "POST",
        dataType: 'json',
        data: picture
    });
}

function getPictureByID(picture) {
    return $.ajax({
        url: "php/main/main_picture.php",
        type: "GET",
        dataType: 'json',
        data: picture
    });
}

function sendRemovePicture(picture) {
    return $.ajax({
        url: "php/main/main_picture.php",
        type: "POST",
        dataType: 'json',
        data: picture
    });
}

//ELIMINAR UNA IMAGEN POR SU ID
function removePictureByID(picture) {
    sendRemovePicture(picture).done(function (response) {
        console.log('%c response_remove: ', 'color: blue', response);
        if (response === true) {
            setTimeout(function () {
                location.reload();
            }, 3000);
        } else {
            console.log('error remove picture');
        }
    }).fail(function (err) {
        console.log('%c err_remove: ', 'color: red', err);
    })
}

//FUNCTION QUE MUESTRA LA IMAGEN ALMACENADA EN LA BDD Y LA MUESTRA EN EL BODY DEL HTML COMO PRUEBA
function showPictureByID(picture) {
    getPictureByID(picture).done(function (response) {
        if (response === false) {
            console.log('%c picture not found', 'color: orange', false);
        } else {
            var img = new Image();
            img.src = response;
            document.body.appendChild(img);//agregar img al body del doc
            console.log('%c img.src_: ', 'color: purple', img);
        }
    }).fail(function (err) {
        console.log('%c err_: ', 'color: orange', err);
    })
}

//FUNCTION EN LA QUE EDITAMOS UNA IMAGEN LLAMANDO A UNA FUNCIÓN INTERNA saveHandler DEL PLUGIN PAINTERRO
//LA IMAGEN EDITADA SE GUARDA EN LA BDD
function saveCreatedPicture(linkPicture) {
    Painterro({
        language: 'es',
        onClose: function () {
            location.href="index.html";
        }, 
        saveHandler: function (image) {
            var picture = {
                'img_base64': image.asDataURL(),
                'link': linkPicture,
                'function_post': 'savePicture'
            }
            console.log('%c picture_: ', 'color: purple', picture);
            sendCreatedPicture(picture).done(function (response) {
                if (response === true) {
                    console.log('%c response_: ', 'color: green', response);
                    setTimeout(function () {
                        location.reload();
                    }, 500);
                }
            }).fail(function (err) {
                console.log('%c err_: ', 'color: orange', err);
            });
        }
    }).show(linkPicture);
}

//FUNCTION QUE PERMITE EDITAR UNA IMAGEN YA ALMACENADA EN LA BDD
function updatePicture(picture) {
    console.log('%c Picture updatePicture obj_1: ', 'color: blue', picture);
    //llamada a la BDD para obtener la imagen que queremos actualizar
    getPictureByID(picture).done(function (response) {
        if (response === false) {
            console.log('Image not found');
        } else {
            var img = new Image();
            img.src = response;
            console.log('img _: ', img);
            Painterro({
                saveHandler: function (image) {
                    console.log('%c imageDataURL()_: ', 'color: blue', image.asDataURL());
                    picture.img_base64 = image.asDataURL();
                    picture.function_post = 'updatePicture';
                    console.log('%c Picture updatePicture obj_2: ', 'color: brown', picture);
                    sendUpdatedPicture(picture).done(function (response) {
                        console.log('%c response_: ', 'color: green', response);
                        if (response === true) {
                            setTimeout(function () {//QUITAR Timeout
                                location.reload();
                            }, 3000);
                        } else {
                            alert('Error update !');
                        }
                    }).fail(function (err) {
                        console.log('%c err_: ', 'color: orange', err);
                    });
                }
            }).show(img.src);
        }
    }).fail(function (err) {
        console.log('%c err_: ', 'color: red', err);
    })

}

function createPicture(){
    $('#btn_createPicture').click(function () {
        $('#btn_createPicture').addClass('isDisabled');
        $('#btn_editPicture').addClass('isDisabled');
        $('#btn_deleteFlat').addClass('isDisabled');
        $('#btn_menuHotspot').addClass('isDisabled');
        $('#btn_menuHotspot').attr("data-toggle", "");
        $('#btn_moveDraggable').addClass('isDisabled');
        $('#btn_moveDraggable').off('click');
        $('#btn_newIcon').addClass('isDisabled');
        $('#btn_newIcon').off('click');
        $('#btn_back').removeClass('isDisabled');
        $('.hotspot').toggle();
        $('.isDisabled').off('click');
        var linkPicture = 'assets/images/flat.jpg';
        // var linkPicture = '';
        // var linkPicture = 'assets/images/lion.png';

        saveCreatedPicture(linkPicture);
    });
}

//Posiblemente le pasaremos como parámetro la imagen que deseamos editar
function editPicture(){
    $('#btn_editPicture').click(function () {
        $('#btn_createPicture').addClass('isDisabled');
        $('#btn_saveHotspot').addClass('isDisabled');
        $('#btn_editPicture').addClass('isDisabled');
        $('#btn_deleteFlat').addClass('isDisabled');
        $('#btn_menuHotspot').addClass('isDisabled');
        $('#btn_menuHotspot').attr("data-toggle", "");
        $('#btn_moveDraggable').addClass('isDisabled');
        $('#btn_moveDraggable').off('click');
        $('#btn_newIcon').addClass('isDisabled');
        $('#btn_newIcon').off('click');
        $('#btn_back').removeClass('isDisabled');
        $('.hotspot').toggle();
        $('.isDisabled').off('click');
        var picture = {
            'id': 53
        }
        picture.function_get = 'getPicture';
        updatePicture(picture);
    });
}

//mostrar una imagen por id
function showPicture(id){
    $('#btn_showPicture').click(function () {
        var picture = {
            'id': id
        }
        picture.function_get = 'getPicture';
        showPictureByID(picture);
    });
}

function removePicture(){
    //seleccionar la imagen que se desea eliminar, función en construcción
    $('#btn_removePicture').click(function () {
        var picture = {
            'id': 57
        }
        picture.function_post = 'removePicture';
        removePictureByID(picture);
    });
}
