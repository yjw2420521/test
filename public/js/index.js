$(function() {
    var $denlu = $('#mymodal');
    var $mysubmit =$('#mysubmit');                                
    $mysubmit.find('button').on('click',function(){
        //通过ajax提交请求
        $.ajax({
            type: 'post',
            url:'/api/user/submit',
            data:{
                username:$mysubmit.find('[name="username"]').val(),
                password:$mysubmit.find('[name="password"]').val(),
                repassword:$mysubmit.find('[name="repassword"]').val(),
            },
            dataType:'json',
            success:function(result){
                // console.log(result);
            //    $('#mymodel').show();
               $mysubmit.find('.xianshi').html(result.message); 
            }
        });
    })
     $denlu.find('button').on('click',function(){
          $.ajax({
              type:'post',
              url :'/api/user/denlu',
              data:{
                username:$denlu.find('[name="username"]').val(),
                password:$denlu.find('[name="password"]').val(),
              },
              dataType:'json',
              success: function(result){
                  console.log(result);
                  $('#mymodel').show();
                  $denlu.find('.xianshi').html(result.message); 
                  window.location.reload();
                  if(!result.code){     
                    //   $(".top").find("#denlu1").hide();
                    //   $(".top").find("#tuichu1").show();
                    //   $('.headTag').find(".btn").show();
                  }
              }
          })
     })
   //  退出
     $('#tuichu1').on('click',function(){
         $.ajax({
              url: '/api/user/tuichu',
              data:{
                username:$denlu.find('[name="username"]').val(),
                password:$denlu.find('[name="password"]').val(),
              },
             success : function(result){
                 if(!result.code){
                     window.location.reload();
                      if(!result.code){
                      $(".top").find("#denlu1").show();
                      $(".top").find("#tuichu1").hide();
                  }
                 }
             }
         })
     })
})