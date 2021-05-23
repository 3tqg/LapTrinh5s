
      var getUrlParameter = function getUrlParameter(sParam) {
          var sPageURL = window.location.search.substring(1),
              sURLVariables = sPageURL.split('&'),
              sParameterName,
              i;

          for (i = 0; i < sURLVariables.length; i++) {

              var arr = sURLVariables[i].split('='),
                  sParameterName = arr.splice(0, 1);
              sParameterName.push(arr.join('='));

              if (sParameterName[0] === sParam) {
                  return typeof sParameterName[1] === undefined ? flase : decodeURIComponent(sParameterName[1]);
              }
          }
          return false;
      };
      function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
      }
      function displayLink(link) {
          var l = `<div>Nhấn vào đây để tiếp tục</div>`;
          $("#link-btn").html(l);
          $("#wait-btn").remove()
          $("#link-btn div").on("click", function () {
              window.open(link, "_parent");
          })
          console.log(2)
      }
      function displayStep(step) {
          var st = (step == 0 ? `<span>Bạn còn bước này nữa thôi :3</span>` : `<span>Bạn còn ${step + 1} bước nữa thôi :3</span>`);
          $("#step").html(st)
      }

      var nextUrl = getUrlParameter("next");
      try {
          var url = atob(nextUrl).split("|"),
              step = url.length - 1,
              page = nextUrl.length == 0 ? 0 : 1;
      } catch (er) {
          var page = 0;
      }

      if (page == 1) {
          if (step == 0) var link = url;
          else {
              var link = url;
              link.splice(url.length - 1, 1);
              link = link.join("|");
              link = btoa(link);
              link = location.protocol + '//' + location.host + location.pathname + '?next=' + encodeURIComponent(link)
          }

          displayStep(step);
          (async function () {
              for (var s = 9; s >= 0; s--) {
                  $("#sec-wait").html(s);
                  await sleep(1000);
              }
              displayLink(link);
          }).call();
      }
      if (page == 0) {
          $("#nof").html("<h2>Có vẻ như liên kết của này đã bị hỏng!</h2>")
          $("#page-1").html("");
      }
