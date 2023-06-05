// On clicking a cell with status of habbit, show/hide the status options
function openStatusOptions(ele, event, habbit_id, day) {
  let box = document.querySelector(`#habbit-${habbit_id} .${day} .status-options`);
//   console.log(getComputedStyle(box).display);
  if (getComputedStyle(box).display == "none") {
    $(`.status-options`).hide();
    $(`#habbit-${habbit_id} .${day} .status-options`).show();
  } else {
    $(`.status-options`).hide();
  }
}

// Update the status of habbit of a particular date
function updateDateStatus(ele,event, habbit_id, checkDate, day, status) {
  event.stopPropagation();
  $.ajax({
    url: "/update-date-status",
    type: "post",
    data: {
      habbit_id: habbit_id,
      checkDate: checkDate,
      status: status,
    },
    success: function (response) {
      // console.log(response);
      // To change the icon os status according to the status info
      if (status == "Done") $(`#habbit-${habbit_id} .${day} .status-icon`).html(`<i class="fas fa-check" style="color: #09b106;"></i>`);
      else if (status == "Not Done") $(`#habbit-${habbit_id} .${day} .status-icon`).html(`<i class="fas fa-times" style="color: #cf2507;"></i>`);
      else $(`#habbit-${habbit_id} .${day} .status-icon`).html(`<i class="fas fa-minus"></i>`);
    
      $(`#habbit-${habbit_id} .${day} .status-options .status-option`).removeClass("active");
      $(ele).addClass("active");
      $(`#habbit-${habbit_id} .${day} .status-options`).hide();
    },
    error: function (err) {
      console.log(err);
      let status;
      if (err.status == 500) status = "error";
      else status = "warning";
      showNotification(status, err.responseJSON.message);
    },
  });
}
