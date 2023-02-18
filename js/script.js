/*
    author : @Farman Saleh
 	created date   : Fabruary 18/2023
 	github : github.com/farmansaleh
**/

/* pass parameter as 
    1 - tableId, 
    2 - column index position from which you want to start, 
    3 - if you add column index in this array it will calculate as flaot for that column otherwise integer */
function displayGrandTotal(tableId,startCol,decimalArray) {
    $('#'+tableId).DataTable(
    {
        "paging": 10,
        "autoWidth": true,
        
        "footerCallback": function () {
            //when we click on paging it will create new footer every time so we have to first remove it
            $("#"+tableId+" > tfoot").remove();
            
            var api = this.api();
            nb_cols = api.columns().nodes().length;
            var j = startCol;
            
            var footerRow = $("<tr/>").addClass("text-primary font-weight-bold");
            footerRow.append($("<td/>").attr("colspan",startCol).text('Grand Total'));
            
            while(j < nb_cols){
                //calculate sum of all td for particular column
                var pageTotal = api
                .column( j, { page: 'all'} )
                .data()
                .reduce( function (a, b) {
                    
                    //if current column index is exist in decimalArray, it will calculate by float type otherwise int
                    if($.inArray(j, decimalArray) != -1){
                        return (parseFloat(a) + parseFloat(b)).toFixed(2);
                    }else{
                        return parseInt(a) + parseInt(b);
                    }
                    
                },0);
                
                //td add in tr of footer and append total it in
                footerRow.append($("<td/>").html(pageTotal) );
                j++;
            }
            //tr append in footer of table
            $("#"+tableId).append($("<tfoot/>").append(footerRow));
        }
    });
}