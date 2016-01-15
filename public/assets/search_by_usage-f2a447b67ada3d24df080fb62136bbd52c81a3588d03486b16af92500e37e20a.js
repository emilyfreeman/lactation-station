String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

$(function(){
  $('#search-submit.search-by-usage').on('click', function(e){
    e.preventDefault();
    $('#drug-data').html('<div id="loader"><img class="center-element margin-top-40" alt="Loading..." src="/assets/ajax-loader-1eb9e7880f723999a4ed63eece6a6e4d4976833d3c16dc18b4ace3971728ab0d.gif" /></div>');

    var usage = $('#drug-usage').val();
    var requri = 'https://api.fda.gov/drug/label.json?limit=10&search=indications_and_usage:"' + usage + '"';

    $.getJSON(requri, function(data) {
      $('#drug-data').html('');
      var drugs = {};
      $.each(data.results, function (key, val) {
        debugger
        var nursing_mothers = val.nursing_mothers;
        var substance_name = val.openfda.substance_name;
        var description = val.description;
        var indications_and_usage = val.indications_and_usage;
        var manufacturer = val.openfda.manufacturer_name;

        if (drugs[substance_name] == undefined) {
          $('#drug-data').append('<div class="margin-top-40 margin-bottom-80">' +
          '<h3>' + substance_name + '</h3><h5>Information from the FDA</h5><p>' +
          '<p>The information below is provided by OpenFDA, a research project. This data is not intended for clinical use. While the FDA makes every effort to ensure the data is accurate, you should assume all results are unvalidated.</p>' +
          '<p><strong>Nursing Mothers: </strong>' + nursing_mothers + '</p>' +
          '<p><strong>Drug Description: </strong>' + description + '</p>' +
          '<p><strong>Usage: </strong>' + indications_and_usage + '</p>' +
          '<p><strong>Manufacturer: </strong>' + manufacturer + '</p>')

          drugs[substance_name] = val;
        }
      });
    })

    .fail(function() {
      $('#drug-data').html('<div class="margin-top-40 margin-bottom-80"><p>There is no information on ' + usage + ' from the FDA to display.</p></div>');
    });

  });
});
