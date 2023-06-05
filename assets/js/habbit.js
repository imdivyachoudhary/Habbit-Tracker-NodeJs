$(document).ready(function () {
  total_habbits = parseInt($("#habbits-list").attr("data-count"));
  if (!total_habbits) {
    $("#habbits-list p.show-failure-message").show();
    $("#habbits-list #habbit-heading").hide();
    $("#weekly-report-link").hide();
};
});

// Add a new habbit
function addHabbit(ele, event) {
  event.preventDefault();
  let form = $(ele);
  let formData = form.serialize();

  $.ajax({
    url: form.attr("action"),
    type: form.attr("method"),
    data: formData,
    success: function (response) {
      //   console.log(response);
      let habbitDom = createHabbitDom(response.data.habbit);
      $(".habbits-list #habbits").prepend(habbitDom);

      showNotification("success", response.message);

      $("#add-habbit-form")[0].reset();

      total_habbits = parseInt($("#habbits-list").attr("data-count")) + 1;
      if (total_habbits==1) {
        $("#habbits-list p.show-failure-message").hide();
        $("#habbits-list #habbit-heading").show();
        $("#weekly-report-link").show();
      };
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

// Update status of habbit for today
function updateDateStatus(ele, habbit_id,checkDate,status) {
    
    $.ajax({
      url: "/update-date-status",
      type: "post",
      data: {
        habbit_id: habbit_id,
        checkDate: checkDate,
        status: status
      },
      success: function (response) {
        // console.log(response);
        $(`.habbits-list #habbit-${habbit_id} .habbit-status-options button`).removeClass("active");
        $(ele).addClass("active");
  
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

function createHabbitDom(habbit) {
  let today = new Date();
  today = today.toLocaleDateString("en-GB");
  return (dom = `<div class="habbit" id="habbit-${habbit._id}">
                    <div class="display_name">${habbit.name}</div>

                    <div class="habbit-status-options">
                    <button
                        class="btn btn-sm"
                        data-id="${habbit._id}"
                        onclick="updateDateStatus(this,'${habbit._id}','${today}', 'Done')"
                    >
                        Done
                    </button>
                    <button
                        class="btn btn-sm"
                        data-id="${habbit._id}"
                        onclick="updateDateStatus(this,'${habbit._id}','${today}', 'Not Done')"
                    >
                        Not Done
                    </button>
                    <button
                        class="btn btn-sm active"
                        data-id="${habbit._id}"
                        onclick="updateDateStatus(this,'${habbit._id}','${today}', 'None')"
                    >
                        None
                    </button>
                    </div>
                </div>`);
}
