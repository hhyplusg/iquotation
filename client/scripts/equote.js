var basePath = '';
var API_URL_Collection = basePath + '/showCollectionList';
$(function () {  
//对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
    // 例子： 
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

var API_URL_Collection = basePath + '/showCollectionList';

        $('#quoteDateStart').datetimepicker({  
            minView: "month",//设置只显示到月份
            format : "yyyy-mm-dd",//日期格式
            autoclose:true,//选中关闭
            todayBtn: true,//今日按钮 
            locale: moment.locale('zh-cn'),
            todayHighlight:true,
            pickerPosition:'bottom-left'
        });  
        $('#quoteDateEnd').datetimepicker({  
            minView: "month",//设置只显示到月份
            format : "yyyy-mm-dd",//日期格式
            autoclose:true,//选中关闭
            todayBtn: true,//今日按钮 
            locale: moment.locale('zh-cn'),
            todayHighlight:true,
            pickerPosition:'bottom-left'
        });  
        $('#quoteDate1').datetimepicker({  
            minView: "month",//设置只显示到月份
            format : "yyyy-mm-dd",//日期格式
            autoclose:true,//选中关闭
            todayBtn: true,//今日按钮 
            locale: moment.locale('zh-cn'),
            todayHighlight:true,
            pickerPosition:'bottom-left'
        });  

        $('#inquiryDateStart').datetimepicker({  
            minView: "month",//设置只显示到月份
            format : "yyyy-mm-dd",//日期格式
            autoclose:true,//选中关闭
            todayBtn: true,//今日按钮 
            locale: moment.locale('zh-cn'),
            todayHighlight:true,
            pickerPosition:'bottom-left'
        });  
        
        $('#inquiryDateEnd').datetimepicker({  
            minView: "month",//设置只显示到月份
            format : "yyyy-mm-dd",//日期格式
            autoclose:true,//选中关闭
            todayBtn: true,//今日按钮 
            locale: moment.locale('zh-cn'),
            todayHighlight:true,
            pickerPosition:'bottom-left'
        });  
        $(".selectpicker").selectpicker({  
                noneSelectedText : '不选为公开报价'//默认显示内容  
        });  
        
        $(window).on('load', function() {  
            $('.selectpicker').selectpicker('refresh');  
            $('.selectpicker').selectpicker('val', '');  
        }); 
        
        loadDropDown();
        
    }); 
    
    function loadDropDown(){
        
        
        //下拉数据加载  
        $.ajax({  
            url : API_URL_Collection,
            //method : "GET",
            contentType : "application/json",
            dataType : "json",
            data :  {
                Collection: "",
            },
            async : false,
            success : function(data) {//返回list数据并循环获取  
                var select = $("#slpk"); 
                $.each(data, function (i, n) { 
                    // opstr += " <option value=\"" + n.os_id + "\">" + n.os_name + "</option>";
                    select.append("<option value='"+n.id+"'>"  
                            + n.corpshortname + "</option>"); 
                    })    
                //$('.selectpicker').selectpicker('val', '');  
                //$('.selectpicker').selectpicker('refresh');  
            }  
        });  
        
    }
    
    $("#refresh").click(function(){
        
        $("#inquiryTable").bootstrapTable('refresh', queryParams);
    });
    //
    var $table = $('#quoteTable');
    function initTable() {
        $table.bootstrapTable({
            method: 'post',
            contentType: "application/x-www-form-urlencoded",
            url: 'equote/equoteS',
            dataField : "data",
            toolbar: '#toolbar',    //工具按钮用哪个容器
            striped: true,
            height:500,
            pagination: true,
            singleSelect: true,
            pageSize:10,
            pageNumber:1,      //初始化加载第一页，默认第一页
            pageList: [10, 20, 50, 100],
            //search: true, //不显示 搜索框
            striped: true,//隔行变色
            strictSearch: true,
            //showExport: true,//显示导出按钮  
            showRefresh: true,     //是否显示刷新按钮
            showToggle:true,     //是否显示详细视图和列表视图的切换按钮
            cardView: false,     //是否显示详细视图
            showColumns: true, //不显示下拉框（选择显示的列）
            sidePagination: "client", //服务端请求
            queryParams: queryParams,
            minimunCountColumns: 2,
            columns: [{
                field: 'quotedate',
                title: '报价日期',
                // width: 120,
                align: 'left',
                valign: 'top',
                sortable: false,
                formatter: function (value, row, index) {
                    if (value == null) {
                        return "";
                    }
                    var dateVal = value + "";
                    var date = new Date(parseInt(dateVal.replace("/Date(", "").replace(")/", ""), 10));
                    return date.Format("yyyy-MM-dd");
                }
            },{
                field: 'quotebank',
                title: '报价银行',
                // width: 80,
                align: 'left',
                valign: 'top',
                sortable: false
            },{
                field: 'ratesevenday',
                title: '7天',
                // width: 80,
                align: 'left',
                valign: 'top',
                sortable: false
            },{
                field: 'ratefourteenday',
                title: '14天',
                // width: 80,
                align: 'left',
                valign: 'top',
                sortable: false
            },{
                field: 'rateonemonth',
                title: '1月',
                // width: 80,
                align: 'left',
                valign: 'top',
                sortable: false
            },{
                field: 'ratetwomonth',
                title: '2月',
                // width: 80,
                align: 'left',
                valign: 'top',
                sortable: false
            },{
                field: 'ratethreemonth',
                title: '3月',
                // width: 80,
                align: 'left',
                valign: 'top',
                sortable: false
            },{
                field: 'ratesixmonth',
                title: '6月',
                // width: 80,
                align: 'left',
                valign: 'top',
                sortable: false
            },{
                field: 'oneyear',
                title: '1年',
                // width: 80,
                align: 'left',
                valign: 'top',
                sortable: false
            },{
                field: 'quotetype',
                title: '报价类型',
                // width: 120,
                align: 'left',
                valign: 'top',
                sortable: false, 
                formatter:function(value,row,index){
                    if(null != value && value=='public'){
                    var e = '广播报价';
                    }
                    if(null != value && value=='private'){
                    var e = '<a id='+row.id+' + onclick="showBank(\''+ row.id + '\')">机构报价</a> ';  
                    }
                    if(null != value && value=='toInquiry'){
                    var e = '<a id='+row.id+' onclick="showBank(\''+ row.id +'\')">询价报价</a> ';  
                    }
                    return e;  
                } 
                
            }],
            pagination:true,
            onLoadSuccess:function(){
            },
            // onLoadError: function () {
            //     swal({ 
            //             title: "哎呦", 
            //             text: "您没有此模块权限，稍后将返回原页面", 
            //             type: "error", 
            //             showConfirmButton: true 
            //         },
            //         function(){ 
            //             window.history.back();
            //         });
            // }
        });
        
    }

    //查询参数
    function queryParams(params) {
        var quoteDateStart =  $("#quoteDateStart").data("datetimepicker").getDate().Format("yyyy-MM-dd");
        var quoteDateEnd =  $("#quoteDateEnd").data("datetimepicker").getDate().Format("yyyy-MM-dd");
        return {
            pageSize: params.limit,
            currentPage: params.offset/params.limit + 1,
            quoteDateStart:quoteDateStart,
            quoteDateEnd:quoteDateEnd,
        };
    }
    
    
    //查询银行参数
    function queryParamsBank() {
        return {
            bankName: $("#inquiryBankName").val(),
        };
    } 
    
    //查询询价参数
    function queryParamsInquiry() {
        var inquiryDateStart =  $("#inquiryStartDate").val();
        var inquiryDateEnd =  $("#inquiryEndDate").val();
        return {
            corpName:"",
            inquiryDateStart:inquiryDateStart,
            inquiryDateEnd:inquiryDateEnd,
        };
    } 
    
    $(function() {
        var userInfo = '${userInfo.userloginname }';
        if(userInfo != null && userInfo.length > 0){
            //初始化表格
            initTable();
        }else{
            window.location.href = "${content}/index.jsp";
        }
        
        //查询按钮点击事件
        $("#btn_query").click(function() {
            var queryParams = JSON.stringify($("#formSearch").serializeJSON());
            $table.bootstrapTable('refresh', queryParams);
        });
        
        //重置按钮点击事件
        $("#btn_rest").click(function() {
            $("#formSearch")[0].reset();
            $("#quoteDateStart").val("");
            $("#quoteDateEnd").val("");   
        });
        
        //查询银行按钮点击事件
        $("#btn_queryBank").click( function() {
            var queryParams = queryParamsBank();
            $bankTable.bootstrapTable('refresh', queryParams);
        });
        

        //查询询价按钮点击事件
        $("#btn_queryInquiry").click( function() {
            var queryParams = queryParamsInquiry();
            $inquiryTable.bootstrapTable('refresh', queryParams);
        });

    });
    
    
    var $bankTable = $('#bankTable').bootstrapTable( {url: API_URL_Collection} );
    
    var API_URL_Inquiry = '${content}/inquiry/showInquiryLists';
    //console.info('${content}');
    var $inquiryTable = $('#inquiryTable').bootstrapTable( {url: API_URL_Inquiry} );
    
    $modal = $('#modal').modal( {show: false} );
    

//解析报价字符串
function addQuote(){
    //var dataJson = JSON.stringify($('#addQuote').serializeJSON());
    var dataJson = {};
    $modal.find('input[name]').each(function () {
    dataJson[$(this).attr('name')] = $(this).val();
    });
    
    var quoteDate1 =  $("#quoteDate1").data("datetimepicker").getDate().Format("yyyy-MM-dd");
    dataJson["quotedate"] = quoteDate1;
    
    var ids =  $("#slpk").val();
    dataJson["ids"] = ids;
    
/*  var quotetype =  $("#quoteType").val(); */
if(flag == "false"  &&  ids == null){
        dataJson["quotetype"] = "public";
}else if(flag =="false" && ids.length > 0){
        dataJson["quotetype"] = "private";
}else if(flag == "true"){
    dataJson["quotetype"] = "toInquiry";
}

    $.ajax({
        url : "equote/insert",
        method : "POST",
        contentType : "application/json",
        dataType : "json",
        data : JSON.stringify(dataJson),
        async : false,
        success : function(data) {
            if (data.success) {
                //Dialog.alert("操作成功");
                $modal.modal('hide');
                $("#slpk").empty();
                loadDropDown();
                $("#slpk").selectpicker('refresh');
                /* $("#quoteType").empty();
                $("#quoteType").append("'<option value='public'>公开</option><option value='private'>对私</option>"
                        +"<option value='toInquiry'>对询价</option>'");
                $("#quoteType").selectpicker('refresh');
                //showAlert(($modal.data('id') ? '修改' : '新增') + ' 记录成功!', 'success');*/
                $("#quoteTable").bootstrapTable('refresh'); 
                $('#addQuote').data('bootstrapValidator').resetForm(true);
                flag = "false";
            } else {
                //Dialog.alert("操作失败");
            }
        },
        error : function(XMLHttpRequest, textStatus,
                errorThrown) {
            var result = JSON
                    .parse(XMLHttpRequest.responseText);
            box.warnBox({
                //"content" : result.errorMessage
            });
        }
    });
}
//当模态框隐藏时，展示所有机构
$('#modal').on('hidden.bs.modal', function () {
    // 执行一些动作...
    $("#slpk").empty();
    loadDropDown();
    $("#slpk").selectpicker('refresh');
/* 	 $("#quoteType").empty();
    $("#quoteType").append("'<option value='public'>公开</option><option value='private'>对私</option>"
        +"<option value='toInquiry'>对询价</option>'");
    $("#quoteType").selectpicker('refresh'); */
})

//新增询价
function addInquiry() {
    //console.log("调用开始：");
    var list= $("#inquiryTable").bootstrapTable('getSelections');
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
    //console.log("内容" + $("#message").val());

var dataJson = '{"inquirycontent":"' + $("#message").val() + '","ids":"' + ids + '"}';
//console.log("json" + dataJson);
    $.ajax({
        url : "equote/insert",
        method : "POST",
        contentType : "application/json",
        dataType : "json",
        data : dataJson,
        async : true,
        success : function(data) {
            if (data.success) {
                //console.log("操作成功");
                $("#bankTable").bootstrapTable('refresh');
            } else {
                //Dialog.alert("操作失败");
            }
        },
        error : function(XMLHttpRequest, textStatus,
                errorThrown) {
            var result = JSON
                    .parse(XMLHttpRequest.responseText);
            box.warnBox({
                //"content" : result.errorMessage
            });
        }
    });
}

var oBtn = document.getElementById('btn');
//var oDiv = document.getElementById('newAddEquote');
oBtn.onclick=function(){
    loadDropDown();
    $('.selectpicker').selectpicker('val', '');  
    showModal("新增报价");
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
        $modal.find('input[name="' + name + '"]').val(row[name]);
    }
    $modal.modal('show');
}

$(function () {
$('#addQuote').bootstrapValidator({
//  live: 'disabled',
message : 'This value is not valid',
feedbackIcons: {
    valid : 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
    },
    fields : {
        corpid : {
            validators : {
                notEmpty : {
                    message : '机构不能为空'
                }
            }
        },
        ratesevenday: {
            validators: {
                    numeric: {
                        message: '只能填写数字'
                    }
            }
        },
        ratefourteenday: {
            validators: {
                    numeric: {
                        message: '只能填写数字'
                    }
            }
        },
        rateonemonth: {
            validators: {
                    numeric: {
                        message: '只能填写数字'
                    }
            }
        },
        ratetwomonth: {
            validators: {
                    numeric: {
                        message: '只能填写数字'
                    }
            }
        },
        ratethreemonth: {
            validators: {
                    numeric: {
                        message: '只能填写数字'
                    }
            }
        },
        ratesixmonth: {
            validators: {
                    numeric: {
                        message: '只能填写数字'
                    }
            }
        },
        oneyear: {
            validators: {
                    numeric: {
                        message: '只能填写数字'
                    }
            }
        }
    
    }
});
});	



//新增机构用户
$("#addQuote").submit(function(ev){ev.preventDefault();});
$(".submit").on("click", function(){

    var bootstrapValidator = $("#addQuote").data('bootstrapValidator');
    bootstrapValidator.validate();
    //console.log("1111");
    if(bootstrapValidator.isValid()) {
        //  console.log("2222");
            //$("form").submit();
        addQuote();
    }  
    else return;
});


//询价记录双击事件
    $('#inquiryRecord').click();
        $('#inquiryTable').on('click-cell.bs.table', function (field, value, row, element)   
                {  
                    /* console.info(field);  
                    console.info(value);  
                    console.info(row);  
                    console.info(element);  
                    console.info("id===============++++++++++++++++++>"+element.corpid);   */
                            
                    //alert("aaa");
                    row = row || {
                        id: '',
                        name: '',
                        stargazers_count: 0,
                        forks_count: 0,
                        description: ''
                    }; // default row value

                    $modal.data('id', row.id);
                    $modal.find('.modal-title').text("新增报价");
                    for (var name in row) {
                        $modal.find('input[name="' + name + '"]').val(row[name]);
                    }
                    $modal.find('input[name="inquiryid"]').val(element.id);
                    /* $("#quoteType").empty();
                    $("#quoteType").append("<option value='toInquiry'>对询价</option>"); */
                    //$("#quoteType").val("public");
                    $("#slpk").empty(); 
                    //$("#slpk").removeAttr("multiple"); 
                    $("#slpk").attr("data-live-search","false"); 
                    $("#slpk").append("<option value='"+element.corpid+"'>"+element.corpshortname+"</option>");
                    $("#slpk").selectpicker('refresh');
                    /* $("#quoteType").selectpicker('refresh');
                    $("#quoteType").selectpicker('val', "toInquiry");*/
                    $("#slpk").selectpicker('val', element.corpid);
                    //console.info(element.id);
                    flag = "true";
                    $modal.modal('show');
                        
                });  

//隐藏弹出层
function hideK(){
    document.getElementById("NG2").style.display = "none";
}
//双击查看当前报价的机构
function showBank(id){
var API_URL_Bank = '${content}/equote/corpSelect';
$.ajax({
    url : API_URL_Bank,
    type : 'post',
    data : {
        id	: id
        },
    cache: false,
        success : function(data) {//返回list数据并循环获取  
            var ng = $("#NG2");
            $('#div2 ul li').each(function(){
                $(this).remove();
            }); 
            $.each(data, function (i, n) { 
            ng.append('<li>'+n.corpname+'</li>');
            })    
            var position=$('#'+id).offset(); 
            $("#div2").offset({ 
                top:position.top+20,
                left:position.left
            });
            if(document.getElementById("NG2").style.display=="none"){
                    document.getElementById("NG2").style.display = "block";
                    $("#NG2").toggleClass("open1"); 
                }else if(document.getElementById("NG2").style.display=="block"){
                    document.getElementById("NG2").style.display = "none"; 
                }else{
                    $("#NG2").toggleClass("open1");  
                }
        }  
});
}

