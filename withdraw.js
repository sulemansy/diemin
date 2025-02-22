<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Withdraw money</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <link rel="stylesheet" href="/plugins/fontawesome-free/css/all.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
  <link rel="stylesheet" href="/dist/css/adminlte.min.css">
  <link rel="stylesheet" href="/css/admin.css">
</head>

<body class="hold-transition sidebar-mini">
  <div class="wrapper">
    <%- include('nav') %>
    <div class="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1>Browse withdrawals <img data-v-7b283485="" width="35px" height="35px" src="/images/withdraw.png" class="chackImg"></h1>
            </div>
          </div>
        </div>
        <!-- /.container-fluid -->
      </section>

      <!-- Main content -->
      <section class="content">

        <!-- Default box -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">withdrawals Requests</h3>

            <div class="card-tools">
              <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
                <i class="fas fa-minus"></i>
              </button>
              <button type="button" class="btn btn-tool" data-card-widget="remove" title="Remove">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
          <div class="card-body p-0" style="overflow-y: hidden;">
            <table class="table table-striped projects">
              <thead>
                <tr>
                  <th class="text-center">#</th>
                  <th class="text-center">Account</th>
                  <th class="text-center">Bank</th>
                  <th class="text-center">Account Number</th>
                  <th class="text-center">Account Name</th>
                  <th class="text-center">IFSC</th>
                   <th class="text-center">UPI ID</th>
                  <th class="text-center">Amount</th>
                  <th class="text-center">Date</th>
                  <th class="text-center">Status</th>
                  <th class="text-center">Accept/Reject</th>
                </tr>
              </thead>
              <tbody>
                
              </tbody>
            </table>
          </div>
        </div>

      </section>
    </div>
  </div>
  <script src="/plugins/jquery/jquery.min.js"></script>
  <script src="/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="/dist/js/adminlte.min.js"></script>
  <script src="/js/admin/admin.js"></script>
  <script src="//cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>
  <script>
    function formateT(params) {
    let result = (params < 10) ? "0" + params : params;
    return result;
    }
    
    function timerJoin(params = '', addHours = 0) {
        let date = '';
        if (params) {
            date = new Date(Number(params));
        } else {
            date = new Date();
        }
    
        date.setHours(date.getHours() + addHours);
    
        let years = formateT(date.getFullYear());
        let months = formateT(date.getMonth() + 1);
        let days = formateT(date.getDate());
    
        let hours = date.getHours() % 12;
        hours = hours === 0 ? 12 : hours;
        let ampm = date.getHours() < 12 ? "AM" : "PM";
    
        let minutes = formateT(date.getMinutes());
        let seconds = formateT(date.getSeconds());
    
        return years + '-' + months + '-' + days + ' ' + hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    }
    function show(params) {
      if (params.length == 0) {
        $('tbody').html(`
            <tr class="text-center">
              <td colspan="7">No more data...</td>
            </tr>
          `);
        return;
      }
      let html = '';
      let show = params.map((data) => {
        html += `<tr class="text-center">
                  <td id="${data.id}">
                    ${data.id}
                  </td>
                  <td>
                    <b>${data.phone}</b>
                  </td>
                  <td>
                    <b>${data.name_bank}</b>
                  </td>
                  <td style="min-width: 190px;">
                    <b>${data.stk}</b>
                  </td>
                  <td style="min-width: 190px;">
                    <b>${data.name_user}</b>
                  </td>
                  <td style="min-width: 190px;">
                    <b>${data.ifsc}</b>
                  </td>
                  <td style="min-width: 190px;">
                    <b>${data.sdt}</b>
                  </td>
                  <td>
                    <b>${data.money}</b>
                  </td>
                  <td style="min-width: 190px;">
                    <b>${timerJoin(data.time)}</b>
                  </td>
                  <td class="project-state">
                    <span class="badge badge-warning">Waiting...</span>
                  </td>
                  <td class="project-actions text-center" style="min-width: 160px;">
                    <!-- xác nhận -->
                    <a class="btn btn-success btn-sm confirm-btn" href="" data="${data.id}"><i class="fa fa-check-circle"></i></a>
                    <!-- ? -->
                    <!-- <a class="btn btn-info btn-sm" href="#"><i class="fas fa-pencil-alt"></i></a> -->
                    <!-- Xóa -->
                    <a class="btn btn-danger btn-sm delete-btn" href="#" data="${data.id}"><i class="fas fa-times-circle"></i></a>
                  </td>
                </tr>`;
              })
          $('tbody').html(html);
          $('.btn-success').click(function (e) { 
            e.preventDefault();
            let id = $(this).attr('data');
            $.ajax({
              type: "POST",
              url: "/api/webapi/admin/withdraw",
              data: {
                id: id,
                type: 'confirm'
              },
              dataType: "json",
              success: function (response) {
                Swal.fire(
                  'Good job!',
                  'Withdrawal Accepted Successfully!',
                  'success'
                )
                setTimeout(() => {
                  location.reload();
                }, 100);
              }
            });
          });
          $('.btn-danger').click(function (e) { 
            e.preventDefault();
            let id = $(this).attr('data');
            $.ajax({
              type: "POST",
              url: "/api/webapi/admin/withdraw",
              data: {
                id: id,
                type: 'delete'
              },
              dataType: "json",
              success: function (response) {
                setTimeout(() => {
                  location.reload();
                }, 100);
                Swal.fire(
                  'Good job!',
                  'Withdrawal Rejected Successfully!',
                  'success'
                )
              }
            });
          });
    }
    $.ajax({
      type: "POST",
      url: "/api/webapi/admin/recharge",
      data: {
        
      },
      dataType: "json",
      success: function (response) {
        show(response.datas3)
      }
    });
  </script>
</body>

</html>
