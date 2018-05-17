var user =34;
console.log(user);

var basePath = '';
var API_URL = basePath + '/showSyscorpinforList';
    
var userInfo = '${userInfo.userloginname }';
if(userInfo != null && userInfo.length > 0){
//var API_URL_Bank = basePath + '/showBankList';
    var $table = $('#table').bootstrapTable({url: API_URL,
        onLoadError: function (data) {
                // swal({ 
                //     title: "哎呦", 
                //     text: "您没有此模块权限，稍后将返回原页面", 
                //     type: "error", 
                //     showConfirmButton: true 
                // },
                // function(){ 
                //     window.history.back();
                // });
        }
    }),
        $modal = $('#modal').modal({show: false}),
        $alert = $('.alert').hide();
}else{
    window.location.href = projectPath+"/index.jsp";
}

var success=function(){
    var data={};
    data.complete=function(){
        alert(12);
    }
    return data;
}
    $(function() {
        // create event
        $('.create').click(function () {
        	//$("#modal input [type:not(radio)]").val("");
        	$("#modal input:not(input[type='radio'])").val("");
        	// $("#modal form").append('<div class="form-group" style="height: 20px;padding-top: 10px"  id="corptype">'+
        	//        	'<label class="col-lg-2" style="padding-left: 0px">机构类型:</label>'+
        	//        	'<label class="radio-inline"><input type="radio" value="1"  name="corptype" >银行用户</input></label>'+
        	//        	'<label class="radio-inline"><input type="radio" value="2" name="corptype">机构用户</input></label>'+
        	//        	'<label class="radio-inline"><input type="radio" value="3" name="corptype">管理员</input></label></div>');
        	$("#addForm").bootstrapValidator("addField", "corptype", {    
	              validators: {    
	            	  notEmpty : {
							message : '此项为必选项'
					  }
	              }    
	          });
            showModal($(this).text());
        });

         // 批量删除机构用户
        $('.delete').click(function () {
        	var list= $("#table").bootstrapTable('getSelections');
			var ids = "";
        	for (var i = 0;i <= list.length; i++ ){
        		var obj = list[i];
        		 for(var j in obj){    
        		        var property=obj[j];
        		        if(j == 'id' && i != 0 ){
	        		        ids = property + "," + ids;  
        		        }else if(j == 'id' && i == 0){
        		        	ids = property + ids;
        		        }
        		    }  
        	}
        	//ids='ids:"'+ids+'"';
   		 if(list.length<=0){
   			 alert("请选中一行");
   		}else{
   			  	var url=basePath+"/deleteSyscorpinforByIds/" + ids;
   	  		    $.ajax({
   	  		        dataType: "json",
   	  		   		contentType: "application/json; charset=utf-8",
   	  		        type: "get", 
   	  		        url: url,
   	  		        success : function () {
	   	  		       	$table.bootstrapTable('refresh');
	                   	showAlert('批量删除成功!', 'success');
   	  		        },
   	  		        error : function (){
   	  		      		showAlert('批量删除失败!', 'danger');
   	  		        }
   	  		    });
   		} 
        });


    function queryParams(params) {
        return {};
    }

    function actionFormatter(value) {
        return [
            '<a class="update" href="javascript:" title="修改用户"><i class="glyphicon glyphicon-edit"></i></a>',
            '<a class="remove" href="javascript:" title="删除用户"><i class="glyphicon glyphicon-remove-circle"></i></a>',
        ].join('');
    }

    function addSyscorpinfor(){
    	var row = {};
        $modal.find('input[name]').each(function () {
              row[$(this).attr('name')] = $(this).val();
        });
              var corptype = $('#corptype input:radio:checked').val();
		      row['corptype'] = corptype;
		      var id = $modal.data('id');
		      row['id'] = id;
	          var url = '';
	          if(id != null && id != ''){
	            url = basePath+'/updateSyscorpinfor';
	          } else {
	            url = basePath+'/addSyscorpinfor';
	          }

		$.ajax({
               url: url,
               type: 'post',
               contentType: 'application/json;charset=utf-8',
               data: JSON.stringify(row),
               success: function () {
                   $modal.modal('hide');
                   $table.bootstrapTable('refresh');
                   showAlert(($modal.data('id') ? '修改' : '新增') + ' 记录成功!', 'success');
                   $('#addForm').data('bootstrapValidator').resetForm(true);
               },
               error: function () {
                   $modal.modal('hide');
                   showAlert(($modal.data('id') ? '修改' : '新增') + ' 记录失败!', 'danger');
               }
           });
    }


    // update and delete events
    window.actionEvents = {
        'click .update': function (e, value, row) {
        	// $("#modal form").append('<div class="form-group" style="height: 20px;padding-top: 10px"  id="corptype">'+
        	//        	'<label class="col-lg-2" style="padding-left: 0px">机构类型:</label>'+
        	//        	'<label class="radio-inline"><input type="radio" value="1"  name="corptype" >银行用户</input></label>'+
        	//        	'<label class="radio-inline"><input type="radio" value="2" name="corptype">机构用户</input></label>'+
        	//        	'<label class="radio-inline"><input type="radio" value="3" name="corptype">管理员</input></label></div>');
        	$("#addForm").bootstrapValidator("addField", "corptype", {    
	              validators: {    
	            	  notEmpty : {
							message : '此项为必选项'
					  }
	              }    
	          }); 
        	showModal($(this).attr('title'), row);
        	
        },
        'click .remove': function (e, value, row) {
            if (confirm('确定要删除此条记录吗?')) {
                $.ajax({
                    url: basePath+'/deleteSyscorpinfor/'+ row.id,
                    type: 'get',
                    success: function () {
                        $table.bootstrapTable('refresh');
                        showAlert('删除成功!', 'success');
                    },
                    error: function () {
                        showAlert('删除失败!', 'danger');
                    }
                })
            }
        }
    };

    function showModal(title, row) {
        row = row || {
            id: '',
            name: '',
            stargazers_count: 0,
            forks_count: 0,
            description: ''
        }; // default row value

        $modal.data('id', row.id);
        $modal.find('.modal-title').text(title);
        for (var name in row) {
            if("password" == name){
           		 $modal.find('input[name="password"]').val();
            }else if("corptype" == name && title == "修改用户"){
            	if(row[name]=="机构用户"){
            		$("input[name='corptype'][value='2']").attr("checked",true); 
            	}else if(row[name]=="银行用户"){
            		$("input[name='corptype'][value='1']").attr("checked",true); 
            	}else{
            		$("input[name='corptype'][value='3']").attr("checked",true); 
            	}
            }else{
	            $modal.find('input[name="' + name + '"]').val(row[name]);
            }
        }
        var id = $modal.data('id');
        if(id != null && id != ''){
     	   $("#addForm").bootstrapValidator("addField", "userloginname", {    
                validators: {    
             	   notEmpty : {
 						message : '登陆名不能为空'
 					},
 					stringLength : {
 						min : 6,
 						max : 30,
 						message : '登陆名长度必须在6到18位之间'
 					},
 					regexp : {
 						regexp : /^[a-zA-Z0-9_\.]+$/,
 						message : '用户名只能包含大写、小写、数字和下划线'
 					},
 					different : {
 						field : 'password',
 						message : '登陆名不能与密码相同'
 					}
                }    
            });
     	   $("#addForm").bootstrapValidator("addField", "password", {    
                validators: {    
 					regexp : {
 						regexp : /^[a-zA-Z0-9_\.]+$/,
 						message : '密码只能包含大写、小写、数字和下划线'
 					},
 					different : {
 						field : 'userloginname',
 						message : '密码不能与用户名相同'
 					}
                }    
            });
     	   $("#addForm").bootstrapValidator("addField", "confirmPassword", {    
                validators: {    
                	identical : {
						field : 'password',
						message : '两次输入密码不一致'
					}
                }    
            });
        }else{
	     	   $("#addForm").bootstrapValidator("addField", "userloginname", {    
	                validators: {    
	             	   notEmpty : {
	 						message : '登陆名不能为空'
	 					},
	 					stringLength : {
	 						min : 6,
	 						max : 30,
	 						message : '登陆名长度必须在6到18位之间'
	 					},
	 					regexp : {
	 						regexp : /^[a-zA-Z0-9_\.]+$/,
	 						message : '用户名只能包含大写、小写、数字和下划线'
	 					},
	 					 remote : {
	 						url : basePath+'/checkUserLoginName',
	 						message : '用户名已存在'
	 					}, 
	 					different : {
	 						field : 'password',
	 						message : '登陆名不能与密码相同'
	 					}
	                }    
	            });
	     	   $("#addForm").bootstrapValidator("addField", "password", {    
	                validators: {    
	             	   notEmpty : {
	 						message : '密码不能为空'
	 					},
	 					regexp : {
	 						regexp : /^[a-zA-Z0-9_\.]+$/,
	 						message : '密码只能包含大写、小写、数字和下划线'
	 					},
	 					different : {
	 						field : 'userloginname',
	 						message : '密码不能与用户名相同'
	 					}
	                }    
	            });
	     	  $("#addForm").bootstrapValidator("addField", "confirmPassword", {    
	              validators: {    
	              		identical : {
							field : 'password',
							message : '两次输入密码不一致'
						}
	              }    
	          });
        }
        $modal.modal('show');
    }

    function showAlert(title, type) {
        $alert.attr('class', 'alert alert-' + type || 'success')
              .html('<i class="glyphicon glyphicon-check"></i> ' + title).show();
        setTimeout(function () {
            $alert.hide();
        }, 3000);
    }
    //当模态框隐藏时，展示所有机构
    $('#modal').on('hide.bs.modal', function () {
   	  // 执行一些动作...
    	$("#corptype").remove();
    	$("#addForm").bootstrapValidator('removeField','userloginname');
    	$("#addForm").bootstrapValidator('removeField','password');
    	$("#addForm").bootstrapValidator('removeField','confirmPassword');
    	$('#addForm').data('bootstrapValidator').resetForm();
   })

$('#addForm').bootstrapValidator({
	//  live: 'disabled',
	message : 'This value is not valid',
	feedbackIcons: {
		valid : 'glyphicon glyphicon-ok',
		invalid: 'glyphicon glyphicon-remove',
		validating: 'glyphicon glyphicon-refresh'
		},
		fields : {
			corpcode : {
				validators : {
					notEmpty : {
						message : '机构编码不能为空'
					}
				}
			},
			corpname : {
				validators : {
					notEmpty : {
						message : '机构名称不能为空'
					}
				}
			},
			corpshortname : {
				validators : {
					notEmpty : {
						message : '机构简称不能为空'
					}
				}
			},
			corptype  : {
				validators : {
					notEmpty : {
						message : '此项为必选项'
					}
				}
			},
			birthday : {
				validators : {
					date : {
						format : 'YYYY/MM/DD',
						message : 'The birthday is not valid'
					}
				}
			},
			gender : {
				validators : {
					notEmpty : {
						message : 'The gender is required'
					}
				}
			},
			'languages[]' : {
				validators : {
					notEmpty : {
						message : 'Please specify at least one language you can speak'
					}
				}
			},
			'programs[]' : {
				validators : {
					choice : {
						min : 2,
						max : 4,
						message : 'Please choose 2 - 4 programming languages you are good at'
					}
				}
			},
			captcha : {
				validators : {
					callback : {
						message : 'Wrong answer',
						callback : function(value, validator) {
							var items = $('#captchaOperation')
									.html().split(' '), sum = parseInt(items[0])
									+ parseInt(items[2]);
							return value == sum;
						}
					}
				}
			}
		}
	});


    //新增机构用户
    $("#addForm").submit(function(ev){ev.preventDefault();});
    $(".submit").on("click", function(){
        var bootstrapValidator = $("#addForm").data('bootstrapValidator');
        bootstrapValidator.validate();
        if(bootstrapValidator.isValid())
            //$("form").submit();
        addSyscorpinfor();
        else return;
    });

    $(".manager-section").on("click", function(){
        $(".drop-down").toggle();
    });
});


    
