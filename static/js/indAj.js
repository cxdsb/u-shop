async function login(){
    let username = $("#username").val();
        let password = $.md5($("#password").val());
       
        let userCode = $("#userCode").val();
        console.log(username, password, userCode)
        let arr = await Ajax({
            url:"/login",
            type:"POST",
            data:{
                username,
                password,
                userCode
            }
            
        })
        localStorage.username = $("#username").val();
        localStorage.password = $.md5($("#password").val());
        alert("登录成功");
        window.location.href = "./";
 }
$('#checkCode').click(function () {
        $('#checkCode').attr('src', "/regcode" + "?" + Math.floor(Math.random() * 10));
    })