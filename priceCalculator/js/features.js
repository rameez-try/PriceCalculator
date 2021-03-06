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

			//hide the installation costs if it's a legacy pricerange selection
			if($('#DateRange option:selected').val().toUpperCase()!="P1")
			{
				$(".Equip_New").hide();
				$(".OneOffTab").hide();
				console.log ("One Off prices hidden");
			}
			else
			{
				$(".Equip_New").show();
				$(".OneOffTab").show();
				console.log ("One Off prices available");
			}

			//clear the calculations
			$("#reset").click(function()
			{
				window.location.reload();
				console.log ("Reset calculations");
			});

      $('.GridSelect').change(function ()
			{
				console.log ("Price Grid Change (select box)");
				connection();
				$(".TVAdditionalSubsType1_PriceGrid tr").hide();
				$(".TalkType1_PriceGrid tr").hide();
				$(".EquipBoxType1_PriceGrid tr").hide();
				$(".AdditionalType1_PriceGrid tr").hide();

				Trow=$("#"+$(this).attr("id")+" option:selected" ).text();
				$(Trow).show();
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

			//Customer switch
			$("#CustomerType").change(function()
			{
				//Clear the Entertainment Prices from the grid
				$(".EPriceGrd  tbody>tr").remove();

				//load the applicable entertainment grid
				getGrid('A');

				  //reset Entertainment Pack Discounts - changing type might affect values
					$("#BoxType_Discounts").find("tr:gt(1)").remove();

					//Reset Pricing selection - nothing is selected by default
					var TVCostFix =parseFloat($("#TVAdditionalSubsTypeTab").text()).toFixed(2);
					$("#TotalTab1").text(parseFloat(TVCostFix).toFixed(2));
					updateTotal(0,1);
					console.log("Customer Switched");
				});

			//Get initial Grids
			getGrid('A'); //Box Type
			getGrid('B'); //Al a Carte & Other TV
			getGrid('C'); //Broadband
			getGrid('D'); //Talk
			getGrid('E'); //SkyQ Boxes
			getGrid('F'); //Multiroom etc.

			//on entering a discount amount, make sure it's a number value
			$('input [type="number"]').keyup(function () {
				this.value = this.value.replace(/[^0-9\.]/g,'');
			});

			//Get Data
			function getGrid(GridTab)
			{
				var datafolder = $('#DateRange').find(":selected").val();

				switch (GridTab)
				{
					case 'A':
						console.log ("Entertainment Price Grid");
						//Entertainment

						//new & Existing customers have different pricing on this grid - determine customer type
						if($("#CustomerType").val()=="A")
						{
									Cust="NewCust";
						}
						else
						{
								 Cust="ExistingCust";
						}

						csv="../getData.php?tbl=data/p1_UK_EntPrices";
						var grid="BoxType";
						var displayRow ="show";
						break;
					case 'B':
						console.log ("Channel Price grid");
						//AdditionalPrices
						csv="../getData.php?tbl=data/p1_UK_ChannelPrices.csv";
						grid="TVAdditionalSubsType";
						displayRow ="hidden";
						break;
					case 'C':
						//Other Prices
						console.log ("Broadband Price grid");
						csv="../getData.php?tbl=data/p1_UK_BroadbandPrices.csv";
						grid="BroadbandType";
						displayRow ="hidden";
						break;
					case 'D':
						//Other Prices
						console.log ("Talk Price grid");
						csv="../getData.php?tbl=data/p1_UK_TalkPrices.csv";
						grid="TalkType";
						displayRow ="hidden";
						break;
					case 'E':
						//Other Prices
						console.log ("Equipment Price grid");
						csv="../getData.php?tbl=data/p1_UK_AdditionalPrices.csv";
						grid="EquipBoxType";
						displayRow ="hidden";
						break;
					case 'F':
						//AdditionalPrices
						console.log ("Other Price grid");
						csv="../getData.php?tbl=data/p1_UK_EntPrices";
						grid="AdditionalType";
						displayRow ="hidden";
						break;
				}
				
				
			
			}
			connection();
			function connection()
			{
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
					var pack = null;
					var basic = 0;
					var cinema = 0;
					var SandC = 0;
					var sport = 0;
					
					{
						$.each(data, function(i, item) 
						{	
							//console.log("in each");
							pack = item[5];
							basic = item[6];
							cinema = item[7];
							SandC = item[8];
							sport = item[9];
							populateGrid(pack, basic, cinema, SandC, sport);
							
						});
					}
				});

				// Run script if request fails
				promise.fail(function() {
				   console.log('A failure ocurred');
				});
			}
			
	
		function populateGrid(pack, basic, cinema, SandC, sport) 
		{
			//console.log("inside populateGrid");
			var tableRow = 0;
			var tblName = "";
			var GridType = 1;
			var rowcount = 0;
			var row = new String("");
			var grid = "BoxType";
			var displayRow = "show";
			var cell = 0;
			
			row += "<tr id='"+grid+"_TRow"+rowcount+"' class='"+displayRow+"'>";
			tblName=grid+GridType+"_PriceGrid";
			
			var npack = pack;
			var nbasic = basic;
			var ncinema = cinema;
			var nsport = sport;
			var nSandC = SandC;
			var disc = 0;
			
			
			if (discount !== 0)
			{
				disc = discount;
			}
			
			if (discountType !== null)
			{
				if (discountType == "percent")
				{
					if(option == "C0")
					{
						nbasic = (basic - (basic*disc)).toFixed(2);
						console.log(nbasic);
					}
					
					if(option == "C4")
					{
						ncinema = (cinema - (cinema*disc)).toFixed(2);
						console.log(ncinema);
					}
					
					if(option == "C5")
					{
						nsport = (sport - (sport*disc)).toFixed(2);
						console.log(nsport);
					}
					
					if(option == "C6")
					{
						nSandC = (SandC-(SandC*discount)).toFixed(2);
						console.log(nSandC);
					}
					
					if(option == "CX")
					{
						nbasic = (basic - (basic*disc)).toFixed(2);
						ncinema = (cinema - (cinema*disc)).toFixed(2);
						nsport = (sport - (sport*disc)).toFixed(2);
						nSandC = (SandC-(SandC*discount)).toFixed(2);
					}
						
					
				}
			
			
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
			
		function deleteGrid()
		{
		
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

				if(tableNm=="BoxType1_PriceGrid" ||tableNm=="BoxType2_PriceGrid" ||tableNm=="BoxType3_PriceGrid" )
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

				//update prices
				/*getGrid('A'); //Box Type
				getGrid('B'); //Al a Carte
				getGrid('C'); //Broadband
				getGrid('D'); //Talk
				getGrid('E'); //SkyQ Boxes
				getGrid('F'); //Multiroom etc.
				*/
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
