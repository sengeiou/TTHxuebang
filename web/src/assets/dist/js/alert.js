Chart.aa=function(date){
  //  $("body").css("background","red");
  //alert(1);
  // $("#example1").DataTable();
  $('#example1').DataTable({
    "paging": true,
    "lengthChange": true,
    "searching": false,
    "ordering": true,
    "info": true,
    "autoWidth": true,
  });
}
Chart.toast=function(con){
    toastr.error(con)
}
Chart.saveing=function(){
  toastr.success("保存成功")
}
Chart.succ=function(con){
  toastr.success(con)
}

Chart.warning=function(title,subtitle,body){
  $(document).Toasts('create', {
    class: 'bg-warning', 
    title: title,
    subtitle: subtitle,
    body: body
  })
}

Chart.saoma=function(){
  $('#saoma').modal({
    backdrop:"static",
    keyboard:false,
    show: true
  });
}
Chart.hidemodel=function(){

  $("#saoma").modal('hide');
}
