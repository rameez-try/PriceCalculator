var cacheVer = 'mps_v1';
basket.require
	(
		//get these things before the others so it's loaded when the dependent files load (caches them to make it load faster)
		{ url: 'js/jquery-2.1.1.js',key:'jqueryLib',unique: cacheVer },
		{ url: 'js/modernizr.js',key:'modernizr',unique: cacheVer },
		{ url: 'js/foundation.min.js',key:'foundation',unique: cacheVer },
		{ url: 'js/foundation/foundation.equalizer.js',key:'equlizr',unique: cacheVer },
		{ url: 'js/jquery.ui.core.js',key:'core',unique: cacheVer },
		{ url: 'js/jquery.ui.widget.js',key:'widgt',unique: cacheVer },
		{ url: 'js/jquery-ui-1.12.0.custom/jquery-ui.min.js',key:'JqUI',unique: cacheVer }
	) .then(function ()
		{
			/*-- Triggers --------------------------------------------------------------------------------------------*/
			//Initialise Foundation
			$(document).foundation();
			getUrlPriceRange();

	/*-- Functions  --------------------------------------------------------------------------------------------*/
	
	window.discount = 0;
	window.discountType = null;
	window.option = null;
	window.csv = "../getData.php?tbl=data/p1_UK_EntPrices";
	window.tab = "";
	

			function getUrlPriceRange()
			{
				//set path to date range prices (LAST 2 CHARS OF URL MUST BE FOLDER NAME MATCHING SELECT OPTION VALUE FOR DATE RANGE)
				var url = window.location.href;

				if (url.indexOf('?') > -1)
				{
					document.getElementById('DateRange').value=url.substring(url.length-2,url.length).toUpperCase();
					console.log ("function getUrlPriceRange: URL price Range ("+url.substring(url.length-2,url.length).toUpperCase()+")");
				}
				else
				{
					console.log ("function getUrlPriceRange: URL price Not specified / Invalid ("+url.substring(url.length-2,url.length).toUpperCase()+")");
				}
			}

			//on change of Date Range, change the variable at the end of the URL & reload the page
			function ChangeDateRange(datafolder)
			{
				var url = window.location.href;
				if (url.indexOf('?') > -1){
					 url=url.substring(0,url.indexOf('=')+1)+datafolder;
				}
				else
				{
					url=url+"?folder="+datafolder;
				}
				window.location.href = url;
				console.log ("Date Range Changed "+url);
			}

			//On change of date range - as the page is reloaded, value of select is passed on URL to next page
			$('#DateRange').change(function ()
			{
				var datafolder = $('#DateRange').find(":selected").val().toUpperCase();
//				console.log("datafolder : "+datafolder)
				ChangeDateRange(datafolder);
			});
			
			$("#tv").click(function()
			{
				console.log("moved to tv");
				csv = "../getData.php?tbl=data/p1_UK_EntPrices";
			});
			$("#broadband").click(function()
			{
				console.log("moved to broadband");
				csv = "../getData.php?tbl=data/p1_data/P1/UK_BroadbandPrices";
			});
			$("#talk").click(function()
			{
				console.log("moved to talk");
				csv = "../getData.php?tbl=data/p1_UK_TalkPrices";
			});
			$("#other").click(function()
			{
				console.log("moved to other");
				csv = "../getData.php?tbl=data/p1_data/P1/UK_BoxPrices";
			});
			//clear the calculations
			$("#reset").click(function()
			{
				window.location.reload();
				console.log ("Reset calculations");
			});
			
			$("#Sky Q Boxes").click(function()
			{
				tab = "Sky Q Boxes";
			});
			
			$("#Sky TV Boxes").click(function()
			{
				tab = "Sky TV Boxes";
			});
			
			$("#Sky TV Boxes - Legacy").click(function()
			{
				tab = "Legacy";
			});
			
			$("#SkyFibre").click(function()
			{
				console.log("sky fibre tab");
				tab = "Fibre";
			});
				
    
			//Currency Type
			var Rgn ="";
			var Cust="";
			var curr = "";
			$(".euro").hide();
			$(".pound").show();


			if($(".UKROI").is(':checked'))
			{
				Rgn ="IR";
				curr = "euro";
				$("#BoxType option[id='Legacy']").remove();

				console.log ("ROI Pricing");
			}
			else
			{
				Rgn ="UK";
				curr= "pound";
				var newOption = "<option id='Legacy' value='3'>Sky TV Boxes - Legacy</option>";
				$("#BoxType").append(newOption);

				console.log ("UK Pricing");
			}

			

			//on entering a discount amount, make sure it's a number value
			$('input [type="number"]').keyup(function () {
				this.value = this.value.replace(/[^0-9\.]/g,'');
			});
	
			
			connection();
			function connection()
			{
			//this funciton uses an ajax post method to connect to the required data. 
			//It uses the variable csv which is declared earlier as the url, this calls a php file script and passes the table name of the data that we want to use. 
			//This is the table name within an oracle database. 
					console.log("inside connection");
					promise = $.ajax({
					url: csv,
					type:"POST",
					dataType: "json",
					cache:false
				});
				console.log ("Price grid - Loaded");
				
			
			
			
				promise.done(function(data)
				{
					
					if (csv == "../getData.php?tbl=data/p1_UK_EntPrices")
					{
						var arr = data[0];
						var pack = arr[5];
						var basic = arr[6];
						var cinema = arr[7];
						var SandC = arr[8];
						var sport = arr[9];
						populateGridTV(pack, basic, cinema, SandC, sport);
						var arr1 = data[1];
						var pack1 = arr1[5];
						var basic1 = arr1[6];
						var cinema1 = arr1[7];
						var SandC1 = arr1[8];
						var sport1 = arr1[9];
						populateGridTV(pack1, basic1, cinema1, SandC1, sport1);
						var arr2 = data[2];
						var pack2 = arr2[5];
						var basic2 = arr2[6];
						var cinema2 = arr2[7];
						var SandC2 = arr2[8];
						var sport2 = arr2[9];
						populateGridTV(pack2, basic2, cinema2, SandC2, sport2);
						var arr3 = data[3];
						var pack3 = arr3[5];
						var basic3 = arr3[6];
						var cinema3 = arr3[7];
						var SandC3 = arr3[8];
						var sport3 = arr3[9];
						populateGridTV(pack3, basic3, cinema3, SandC3, sport3);
					}

					if (csv == "../getData.php?tbl=data/p1_data/P1/UK_BroadbandPrices")
					{
						var broadArr = data[0];
						var broadpack = broadArr[5];
						var broadregion = broadArr[6];
						var broadcond = broadArr[7];
						populateGridBroadband(broadpack, broadregion, broadcond);
						
					}

					if (csv == "../getData.php?tbl=data/p1_UK_TalkPrices")
					{	
						var talkarr = data[0];
						console.log(talkarr);
						var talkpack = talkarr[5];
						var talkcond = talkarr[6];
						var talkprice = talkarr[7];
						populateGridTalk(talkpack, talkcond, talkprice);
	
					}
				});

				// Run script if request fails
				promise.fail(function() {
				   console.log('A failure ocurred');
				});
			}
			
		
		function populateGridTV(pack, basic, cinema, SandC, sport)
		{
			var tableRow = 0;
			var tblName = "";
			var GridType = 1;
			var rowcount = 0;
			var row = new String("");
			var grid = "BoxType";
			var displayRow = "show";
			var cell = 0;
			//This takes the table which is made in the .html file and populates it by adding to the table rows. 
			//There are different tables made in the .html file and this chooses the correct one based on the csv passed as the url. 
			//The reason for this is the csv is set based on what data is needed and that corresponds to which table needs to be populated too.
			//e.g. we may have to populate the broadband prices grid 
			row += "<tr id='"+grid+"_TRow"+rowcount+"' class='"+displayRow+"'>";
			tblName = "BoxType1_PriceGrid";
			
			var npack = pack;
			var nbasic = basic;
			var ncinema = cinema;
			var nsport = sport;
			var nSandC = SandC;
			var disc = 0;
			//These are the variables that will be manipulated for discount 
			
			
			if (discount !== 0)
			{
				disc = discount;
			}
			
			if (discountType !== null)
			{
				if (discountType == "percent")
				{
				//this is based on what has been selected in the discount gird, so in this case it is a percentage discount for basic only.
					if(option == "C0")
					{
						nbasic = (basic - (basic*disc)).toFixed(2);
						console.log(nbasic);
					}
					//percentage cinema only 
					if(option == "C4")
					{
						ncinema = (cinema - (cinema*disc)).toFixed(2);
						console.log(ncinema);
					}
					//percentage sport only
					if(option == "C5")
					{
						nsport = (sport - (sport*disc)).toFixed(2);
						console.log(nsport);
					}
					//percentage sports and cinema
					if(option == "C6")
					{
						nSandC = (SandC-(SandC*discount)).toFixed(2);
						console.log(nSandC);
					}
					//percentage all
					if(option == "CX")
					{
						nbasic = (basic - (basic*disc)).toFixed(2);
						ncinema = (cinema - (cinema*disc)).toFixed(2);
						nsport = (sport - (sport*disc)).toFixed(2);
						nSandC = (SandC-(SandC*discount)).toFixed(2);
					}
						
					
				}
			
				//This is the same however this time the percetnage selected is a monetary discount rather than a percentage discount.
				if (discountType == "number")
				{
					if(option == "C0")
					{
						nbasic = (basic - disc).toFixed(2);
						console.log(nbasic);
					}
					
					if(option == "C4")
					{
						ncinema = (cinema - disc).toFixed(2);
						console.log(ncinema);
					}
					
					if(option == "C5")
					{
						nsport = (sport - disc).toFixed(2);
						console.log(nsport);
					}
					
					if(option == "C6")
					{
						nSandC = (SandC- disc).toFixed(2);
						console.log(nSandC);
					}
					
					if(option == "CX")
					{
						nbasic = (basic - disc).toFixed(2);
						ncinema = (cinema - disc).toFixed(2);
						nsport = (sport - disc).toFixed(2);
						nSandC = (SandC- disc).toFixed(2);
					}
				
				}
			}
			
			
			
		//adding these variables to the rows in the table
			row+= "<td class='"+grid+"cell C"+cell+" highlight'><span class='price'>" + pack +"</span><span class='originalprice hidden'></span></td>";
			row+= "<td class='"+grid+"cell C"+cell+" highlight'><span class='price "+curr+"'>" + nbasic; +"</span><span class='originalprice hidden'></span></td>";
			row+= "<td class='"+grid+"cell C"+cell+" highlight'><span class='price "+curr+"'>" + ncinema; +"</span><span class='originalprice hidden'></span></td>";
			row+= "<td class='"+grid+"cell C"+cell+" highlight'><span class='price "+curr+"'>" + nsport; +"</span><span class='originalprice hidden'></span></td>";
			row+= "<td class='"+grid+"cell C"+cell+" highlight'><span class='price "+curr+"'>" + nSandC; +"</span><span class='originalprice hidden'></span></td>";
	
			row += "</tr>";
			

			//increment ID counter
			rowcount++;

			//Add row to table
			$('#'+tblName+' tbody').append(row);
			
		}
		
		function populateGridTalk(pack, basic, cinema)
		{
			var tableRow = 0;
			var tblName = "";
			var GridType = 1;
			var rowcount = 0;
			var row = new String("");
			var grid = "BoxType";
			var displayRow = "show";
			var cell = 0;
			//This takes the table which is made in the .html file and populates it by adding to the table rows. 
			//There are different tables made in the .html file and this chooses the correct one based on the csv passed as the url. 
			//The reason for this is the csv is set based on what data is needed and that corresponds to which table needs to be populated too.
			//e.g. we may have to populate the broadband prices grid 
			row += "<tr id='"+grid+"_TRow"+rowcount+"' class='"+displayRow+"'>";
			tblName = "TalkType1_PriceGrid";
			
			var npack = pack;
			var nbasic = basic;
			var ncinema = cinema;
			var disc = 0;
			//These are the variables that will be manipulated for discount 
			
			
			if (discount !== 0)
			{
				disc = discount;
			}
			
			if (discountType !== null)
			{
				if (discountType == "percent")
				{
				//this is based on what has been selected in the discount gird, so in this case it is a percentage discount for basic only.
					if(option == "C0")
					{
						nbasic = (basic - (basic*disc)).toFixed(2);
						console.log(nbasic);
					}
					//percentage cinema only 
					if(option == "C4")
					{
						ncinema = (cinema - (cinema*disc)).toFixed(2);
						console.log(ncinema);
					}
					//percentage all
					if(option == "CX")
					{
						nbasic = (basic - (basic*disc)).toFixed(2);
						ncinema = (cinema - (cinema*disc)).toFixed(2);
					}
						
					
				}
			
				//This is the same however this time the percetnage selected is a monetary discount rather than a percentage discount.
				if (discountType == "number")
				{
					if(option == "C0")
					{
						nbasic = (basic - disc).toFixed(2);
						console.log(nbasic);
					}
					
					if(option == "C4")
					{
						ncinema = (cinema - disc).toFixed(2);
						console.log(ncinema);
					}
					
					if(option == "CX")
					{
						nbasic = (basic - disc).toFixed(2);
						ncinema = (cinema - disc).toFixed(2);
					}
				
				}
			}
			
			
			
		//adding these variables to the rows in the table
			row+= "<td class='"+grid+"cell C"+cell+" highlight'><span class='price'>" + pack +"</span><span class='originalprice hidden'></span></td>";
			row+= "<td class='"+grid+"cell C"+cell+" highlight'><span class='price "+"'>" + nbasic; +"</span><span class='originalprice hidden'></span></td>";
			row+= "<td class='"+grid+"cell C"+cell+" highlight'><span class='price "+curr+"'>" + ncinema; +"</span><span class='originalprice hidden'></span></td>";
	
			row += "</tr>";
			

			//increment ID counter
			rowcount++;

			//Add row to table
			$('#'+tblName+' tbody').append(row);
			
		}
		
		function populateGridBroadband(pack, basic, cinema)
		{
			var tableRow = 0;
			var tblName = "";
			var GridType = 1;
			var rowcount = 0;
			var row = new String("");
			var grid = "BoxType";
			var displayRow = "show";
			var cell = 0;
			//This takes the table which is made in the .html file and populates it by adding to the table rows. 
			//There are different tables made in the .html file and this chooses the correct one based on the csv passed as the url. 
			//The reason for this is the csv is set based on what data is needed and that corresponds to which table needs to be populated too.
			//e.g. we may have to populate the broadband prices grid 
			row += "<tr id='"+grid+"_TRow"+rowcount+"' class='"+displayRow+"'>";
			tblName = "BroadbandType1_PriceGrid";
			
			var npack = pack;
			var nbasic = basic;
			var ncinema = cinema;
			var disc = 0;
			//These are the variables that will be manipulated for discount 
			
			
			if (discount !== 0)
			{
				disc = discount;
			}
			
			if (discountType !== null)
			{
				if (discountType == "percent")
				{
				//this is based on what has been selected in the discount gird, so in this case it is a percentage discount for basic only.
					if(option == "C0")
					{
						nbasic = (basic - (basic*disc)).toFixed(2);
						console.log(nbasic);
					}
					//percentage cinema only 
					if(option == "C4")
					{
						ncinema = (cinema - (cinema*disc)).toFixed(2);
						console.log(ncinema);
					}
					//percentage all
					if(option == "CX")
					{
						nbasic = (basic - (basic*disc)).toFixed(2);
						ncinema = (cinema - (cinema*disc)).toFixed(2);
					}
						
					
				}
			
				//This is the same however this time the percetnage selected is a monetary discount rather than a percentage discount.
				if (discountType == "number")
				{
					if(option == "C0")
					{
						nbasic = (basic - disc).toFixed(2);
						console.log(nbasic);
					}
					
					if(option == "C4")
					{
						ncinema = (cinema - disc).toFixed(2);
						console.log(ncinema);
					}
					
					if(option == "CX")
					{
						nbasic = (basic - disc).toFixed(2);
						ncinema = (cinema - disc).toFixed(2);
					}
				
				}
			}
			
			
			
		//adding these variables to the rows in the table
			row+= "<td class='"+grid+"cell C"+cell+" highlight'><span class='price'>" + pack +"</span><span class='originalprice hidden'></span></td>";
			row+= "<td class='"+grid+"cell C"+cell+" highlight'><span class='price "+"'>" + nbasic; +"</span><span class='originalprice hidden'></span></td>";
			row+= "<td class='"+grid+"cell C"+cell+" highlight'><span class='price "+curr+"'>" + ncinema; +"</span><span class='originalprice hidden'></span></td>";
	
			row += "</tr>";
			

			//increment ID counter
			rowcount++;

			//Add row to table
			$('#'+tblName+' tbody').append(row);
			
		}
		
		function deleteGrid()
		{
		//this function is needed when a discount is added to clear the old prices and then add the new discounted prices.
			$("#BoxTypeRows1 table tbody").html("");
			$("#BoxType1_PriceGrid table tbody").html("");
			$("#BoxTypeRows2 table tbody").html("");
			$("#BoxType2_PriceGrid table tbody").html("");
			$("#BoxTypeRows3 table tbody").html("");
			$("#BoxType3_PriceGrid table tbody").html("");
		}
			
		function applyDiscount(DiscountAmount, option)
		{
			console.log("inside apply percentage discount function");
			discountType = "percent";
			discount = DiscountAmount/100;
			connection();
		}
		
		function applyMoneyDiscount(DiscountAmount, option) 
		{
			console.log("inside apply money discount function");
			discountType = "number";
			discount = DiscountAmount;
			connection();
		}
		
		function getDiscount(table, tableNm, NumRow) 
		{
			var DiscountFor = table.rows[1].cells[0].children[0].value;
			var DiscountAmount = table.rows[1].cells[1].children[0].value;
			var DiscountType = table.rows[1].cells[2].children[0].value;
			option = table.rows[1].cells[3].children[0].value;
			if (DiscountType == 1) 
			{
				deleteGrid();
				applyDiscount(DiscountAmount, option);
				console.log("percentage discount");
			}
			
			if (DiscountType == 2) 
			{
				deleteGrid();
				applyMoneyDiscount(DiscountAmount, option);
				console.log("pound discount");
			}
		}
			//Add or Remove Discounts and update the pricing grid applicable
			$(document.body).on("click touchstart", ".editRow", function ()
			{
				var tableNm = $(this).closest('table').attr('id');
				var table = document.getElementById(tableNm);

				var NumCols = $("#"+tableNm+" tr:nth-child(1) td").length;
				var NumRow = $("#"+tableNm+" tr").length;

				if($(this).hasClass('addRow'))
				{
					getDiscount(table, tableNm, NumRow);
				}
				//Clear input boxes
				$("#"+tableNm+" input").val('');
			});
			

			//Onclick of the Pricing Grid select the price and put it in the total
			$(document.body).on("click touchstart", ".highlight", function ()
			{
				var tableNm = $(this).closest('table').attr('id');
				var table = document.getElementById(tableNm);

				if(tableNm=="BoxType1_PriceGrid" ||tableNm=="BoxType2_PriceGrid" ||tableNm=="BoxType3_PriceGrid" || tableNm=="BroadbandType1_PriceGrid" )
				{
					$(".highlight").css('background-color', 'white');
					$(".highlight").removeClass('highlightActive');

					if($(this).hasClass('highlight'))
					{
						$(this).css('background-color', 'red');
						$(this).addClass('highlightActive');

						var selectedPackagePrice = parseFloat($('.highlightActive .price').text());
					}
				}

				helpText();
				updateTotal(parseFloat(selectedPackagePrice).toFixed(2),1);
				console.log("Update Entertainment total " + tableNm );

			});


			//on changing region update the files etc.
			$(".UKROI").change(function()
			{
				console.log ("set currency type" + Rgn);
				//set Currency Type
				if($(".UKROI").is(':checked'))
				{
					Rgn ="IR";
					curr = "euro";
					$("#BoxType option[id='Legacy']").remove();

					$(".poundTab").addClass("euroTab");
					$(".euroTab").removeClass("poundTab");
					$(".euro").show();
					$(".pound").hide();
				}
				else
				{
					Rgn ="UK";
					curr= "pound";
					var newOption = "<option id='Legacy' value='3'>Sky TV Boxes - Legacy</option>";
					$("#BoxType").append(newOption);

					$(".euroTab").addClass("poundTab");
					$(".poundTab").removeClass("euroTab");
					$(".euro").hide();
					$(".pound").show();
				}

				//clear tables
				$(".regionalSwitch").empty();

				//clear subscription selects
				$('#TVAdditionalSubsType').find('option:not(:first)').remove();
				$('#AdditionalType').find('option:not(:first)').remove();
				$('#BroadbandType').find('option:not(:first)').remove();
				$('#TalkType').find('option:not(:first)').remove();
				$('#EquipBoxType').find('option:not(:first)').remove();

				//reset totals
				$(".TotalSum").each(function()
				{
					$(this).text("0.00");
				});

				$(".TotalTb").text("0.00");

				//Remove all active classes
				$("td").removeClass("highlightActive");

				//reset help text
				helpText();
			});


			//Help text on BoxType Grid selection
			function helpText()
			{
				var helpTxt = ["Basic Package", "Basic Package and Sky Cinema", "Basic Package and Sky Sports","Basic Package with both Sky Cinema and Sky Sports"];
				var rowref="";
				var packageNm="";
				var cell=0;

				$(".BoxTypecell").each(function ()
				{
					if($(this).hasClass('highlightActive'))
					{
						rowref=$(this).parent().attr("id");
						packageNm=$("#"+rowref).find("td").eq(0).text();
						$("#HelpTxt").text(packageNm+", "+helpTxt[cell]);
					}
					cell++;

					if(cell==4)
					{
						cell=0;
					}
				});

				if(rowref==="")
				{
					$("#HelpTxt").text("-- Please select a price from the Grid --");
				}

				console.log ("set help text under entertainment grid");
			}


			//On change of selection update the price grid and re-apply the discount
			$(".GridSelect").change(function()
			{
				var nm = $(this).attr("id");
				var selection=$("#"+nm+" option:selected").val();
				$("."+nm+"_Optional").hide();

				if(selection!="0")
				{
					if (nm != "BoxType")
					{
						//show subscription
						$("#"+nm+"1_PriceGrid tbody tr").hide();
						$("#"+selection).show();
					}
					else
					{
						//Hide tables
						$("#BoxType1_PriceGrid").hide();
						$("#BoxType2_PriceGrid").hide();
						$("#BoxType3_PriceGrid").hide();

						//Hide Package checkboxes
						$(".package1").hide();
						$(".package2").hide();
						$(".package3").hide();

						//Show selected table / packages checkboxes
						$("#BoxType"+selection+"_PriceGrid").show();
						$(".package"+selection).show();
					}
					$("."+nm+"_Optional").show();
				}

				console.log ("price grid visibility change");
				connection();
			});

			//On click of the add subscript button add an Additional / Other Package
			$(".button").bind("click touchstart", function()
			{

				//Get the selected subscription details from the Package table
				var nm = ($(this).attr("id")).replace("Button","Type");
				var selection=$("#"+nm+" option:selected").val();
				console.log (nm);
				//Prevent the same Additional subscription being added twice (other may have multiple)
				if($("#B_"+selection).length && nm=="AdditionalType")
				{
					$("#B_"+selection).remove();
				}

				//Get Discounts from Discount table applicable
				var discount="";
				var countr=0;

				$("#"+nm+"_Discount > tbody > tr").each(function()
				{
					if(countr>0)
					{
						var RowDiscount=($(this).find("td:first").html());

						discount=discount+RowDiscount+"</br>";
					}
					countr++;
				});

				//reset discount inputs
				$("#"+nm+"_Discount input").val('');

				//Add the price with the discount description to the totals table
				var tableNm =nm+"_Buying";
				var table   = document.getElementById(tableNm);

				var NumCols = $("#"+tableNm+" tr:nth-child(1) td").length;
				var NumRow = $("#"+tableNm+" tr").length;

				//to add a row
					var row = new String("");
					row = "<tr id='B_"+selection+"'>";
					row +="<td>"+$("#"+selection+" td").eq(0).html()+"</td>";
					row +="<td>"+$("#"+selection+" td").eq(1).html()+"</td>";
					row +="<td class='DiscountTbl'>"+discount+"</td>";
					if (nm!="EquipBoxType")
					{row +="<td>"+$("#"+selection+" td").eq(2).html()+"</td>";}
					row +="<td><p class='editRow deleteRow'><i title='minus' class='fa icon-minus tableIcon'></i></p></td>";
					row += "</tr>";

					//add row
					$('#'+tableNm+' tbody').append(row);

				//after Bought row added hide the selection, drop the discounts and reset the Selection to 'Not selected'

				//hide section
				$("."+nm+"_Optional").hide();

				//Reset discounts
				$("#"+nm+"_Discount").find("tr:gt(1)").remove();

				//reset select
				$("#"+nm).prop('selectedIndex',0);

				//set the grids back to show the original prices not the discount
				$("#"+nm+"1_PriceGrid tr").each(function ()
				{
					//reset prices to default THEN apply remaining Discounts
					var OPrice=$(this).find(".originalprice").text();
					$(this).find(".price").text(OPrice);
				});

				console.log ("Update Price grid and apply discounts");

				//set the grand total
				updateTotal(nm,2);
			});

			function updateTotal(tabApplic,Tabtype)
			{
				//update grand total
				var TotalCost=0.00;

				if (Tabtype==1)
				{ //Main grid price
					if ($(".highlightActive").length > 0)
					{
						$("#BoxTypeTab").text(parseFloat(tabApplic).toFixed(2));
					}
					else
					{
						$("#BoxTypeTab").text(parseFloat("0.00").toFixed(2));
					}
				}
				else
				{ // Additional / Other prices
					//update totals
					var TabPrice=0.00;

					//count up each row to a total
					$("#"+tabApplic+"_Buying .price").each(function()
					{
						var price=parseFloat($(this).text());
						TabPrice=TabPrice+price;
					});

					//set the applicable tab to the total column cost
					$("#"+tabApplic+"Tab").text(parseFloat(TabPrice).toFixed(2));
					console.log ("id="+tabApplic+"Tab");
				}

				$(".TotalSum").each(function()
				{
					var price=parseFloat($(this).text());
					TotalCost=TotalCost+price;
				});

				//tab totals
				var TVTabCost=$("#BoxTypeTab").text();
				var TVExtraChannelsCost=$("#TVAdditionalSubsTypeTab").text();
				var TVAdditionalCost = $("#AdditionalTypeTab").text();
				var BBTabCost = parseFloat($("#BroadbandTypeTab").text()).toFixed(2);
				var TKTabCost = parseFloat($("#TalkTypeTab").text()).toFixed(2);
				var EQTabCost = parseFloat(parseFloat($("#EquipBoxTypeTab").text())).toFixed(2);

				if (isNaN(TVTabCost))	{
					TVTabCost=0;
					console.log ("NaN - Entertainment grid");
				}

				if (isNaN	(TVExtraChannelsCost))
				{
					TVExtraChannelsCost=0;
					console.log ("NaN - Channels");
				}

				if (isNaN(BBTabCost))	{
					BBTabCost=0;
					console.log ("NaN - Broadband grid");
				}

				if (isNaN(TKTabCost))	{
					TKTabCost=0;
					console.log ("NaN - Talk grid");
				}

				if (isNaN(EQTabCost))	{
					EQTabCost=0;
					console.log ("NaN - Equip grid");
				}

				//extra plus is to make JS parse the values as a number instead of a string.
				var TVCost =parseFloat(+TVTabCost + +TVExtraChannelsCost + +TVAdditionalCost).toFixed(2);
				$(".TV_TotalCost").text(TVCost);

				var BBCost = parseFloat(BBTabCost).toFixed(2);
				$(".BB_TotalCost").text(BBCost);

				var TKCost = parseFloat(TKTabCost).toFixed(2);
				$(".TK_TotalCost").text(TKCost);

				var EQCost = parseFloat(parseFloat(EQTabCost)).toFixed(2);
				$(".EQ_TotalCost").text(EQCost);

				//overall totals
				$("#TotalTab2").text(parseFloat(EQCost).toFixed(2));
				if(TotalCost)
				{
					console.log("tc:"+TotalCost);
					$("#TotalTab1").text(parseFloat(TotalCost).toFixed(2));
				}
				else {
					$("#TotalTab1").text(parseFloat(0.00).toFixed(2));
				}

				console.log("Update Totals - "+Tabtype);
			}

			$( document ).ready(function(){
					var offset = 250;
					var duration = 300;
					$(window).scroll(function() {
						if ($(this).scrollTop() > offset) {
							$('.back-to-top').fadeIn(duration);
						} else {
							$('.back-to-top').fadeOut(duration);
						}
					});

					$('.back-to-top').click(function(event) {
						event.preventDefault();
						$('html, body').animate({scrollTop: 0}, duration);
						return false;
					});
				});


		}), function (error)
		{
			// There was an error fetching the script
			console.log(error);
		};
		
	
