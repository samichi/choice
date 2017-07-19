$().ready(function () {
    $("#user-login-form").validate({
            messages: {
                email: "Por favor ingresa un email válido",
                password: {
                    required: "Por favor ingresa una contraseña",
                    minlength: "Tu contraseña debe tener al menos 4 caracteres"
                },
            }, submitHandler: function (form) {
                login();
            }
        }
    );

    $("#user-register-form").validate({
        messages: {
            fullname: "Por favor ingresa tu nombre completo",
            password: {
                required: "Por favor ingresa una contraseña",
                minlength: "Tu contraseña debe tener al menos 4 caracteres"
            },
            ID: {
                required: "Por favor ingresa tu número de cédula",
                minlength: "La cédula de identificación debe tener al menos 6 caracteres",
                maxlength: "La cédula de identificación debe tener máximo 10 caracteres",
            },
            email: "Por favor ingresa un email válido",
            phone: "Por favor ingresa tu número de celular",
            gender: "Por favor selecciona tu género",
            country: "Por favor selecciona su país",
            city: "Por favor selecciona tu ciudad",
            province: "Por favor selecciona tu provincia",
            day: "Requerido",
            month: "Requerido",
            year: "Requerido",
        },
        submitHandler: function (form) {
            register();
        }
    }
);

});

function login() {
    $('#user-login-btn').html("Verificando...");

    var data = {
        "Email": $("#signin_email").val(),
        "Password": $("#signin_password").val(),
        "RememberMe": $("#rememberme").prop("checked")
    };
    $.ajax({
        type: 'POST',
        url: "/Account/Login",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        complete: function (xhr, textStatus) {
            if (xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.HttpResponse.code == "200") {
                    //localStorage.setItem("accessToken", response.Token.TokenData.access_token);
                    $(".modal").removeClass("show");
                    $(".modal").attr("aria-hidden", "true");
                    $("body").removeClass("modal-open");
                    var menu = "<li class=\"dropdown\"><a class=\"dropdown-toggle\" data-toggle=\"dropdown\"><img style=\"height:30px; margin-right:5px;\" src=\"\/images\/icons\/mireserva.svg\">Bienvenido "+ response.Profile.Name +" <i class=\"fa fa-chevron-down\"><\/i><\/a><ul class=\"dropdown-menu\"><li><a>Mis Viajes<\/a><\/li><li><a>Mi Perfil<\/a><\/li><li><a>Preferencias<\/a><\/li><li id=\"logout\"><a>Salir<\/a><\/li><\/ul><\/li>"
                    $('#nav-menu').html(menu);
                }
                else {
                    alert(response.HttpResponse.message);

                }
            }
            else {
                console.log("hubo un error desconocido.");
            }
        }

    });
}


function register() {
    var data = {
        "Email": $("#signup_email").val(),
        "Password": $("#signup_password").val(),
        "ConfirmPassword": $("#signup_password").val(),
        "IDNumber": $("#signup_id").val(),
        "Name": $("#signup_fullname").val(),
        "PhoneNumber": $("#signup_phone").val(),
        "Gender": $("#signup_gender").val(),
        "Country": $("#signup_country").val(),
        "City": $("#signup_city").val(),
        "Province": $("#signup_province option:selected").text(),
        "Birth": $("#signup_day").val() + "/" + $("#signup_month").val() + "/" + $("#signup_year").val(),

    };
     $.ajax({
        type: "POST",
        url: 'Account/Register/',
        data: data,
        dataType: "json",
        complete: function (xhr, status, error) {
            if (xhr.status == 200) {

            }
            if (xhr.status == 400) {
                alert("Hubo un error");
            }
            if (xhr.status == 404) {
                showErrorMessage("hay problemas de conexión.")
            }
        }
    });
}

$(document).on('click', '#logout', function () {
    $.ajax({
        type: "POST",
        url: "/Account/Logout",
        contentType: 'application/json; charset=utf-8',
        complete: function (xhr, textStatus) {
            if (xhr.status == 200) {
                window.location.replace("/");
            }
            else {
                alert("Hubo un problema de conexión.");
            }
        }
    });

})