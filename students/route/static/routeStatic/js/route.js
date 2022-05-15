
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


$('.regisrtButton').click(function () {
  
    requestCreatePerson();
});

function requestCreatePerson() {

    const csrftoken = getCookie('csrftoken');

    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var group = $('#group').val();
 

    if (firstName == '') {
        return alert("Поле Имя не может быть пустым!");
    }
    if (lastName == '') {
        return alert("Поле Фамилия не может быть пустым!");
    }
    if (group == '') {
        return alert("Поле Группа не может быть пустым!");
    }

    var dataRegistr = {
        csrfmiddlewaretoken: csrftoken,
        firstName:  firstName,
        lastName: lastName,
        group: group,
    }

    $.ajax({
        method: "POST",
        dataType: "json",
        //async: false,
        data: dataRegistr,
        url: 'http://127.0.0.1:8000/route/create/',
        // headers: { "X-CSRFToken": csrftoken },
        success: function (response) {
            // console.log("success" + JSON.stringify(response)); 
            console.log(response.status);
        },
        error: function (err) {
            console.log("error");
            console.log(err);
        }
    });
}





$('.getList').click(function () {
    getList();
});

function getList() {

    $.ajax({
        type: 'GET', 
        // dataType: "json",
        url: 'http://127.0.0.1:8000/route/list/',
        // headers: { "X-CSRFToken": csrftoken },
        success: function (response) {
            if (response) {
            // var jsonRes = JSON.parse(response)
              console.log(response)

            }
        },
        error: function (err) {
            console.log("error");
            console.log(err);
        }
    });
}


$( "#toggleButton" ).click(function() {
    $( ".registrationsToggle" ).slideToggle( "fast" );
  });

