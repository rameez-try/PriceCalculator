<html>
<body>
<?php
?>

<!DOCTYPE html>
	<head>
		<title>Monthly Package Price</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="cache-control" content="max-age=0" />
		<meta http-equiv="cache-control" content="no-cache" />
		<meta http-equiv="expires" content="0" />
		<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
		<meta http-equiv="pragma" content="no-cache" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta http-equiv="Content-Type" content="text/html; charset=utf-9" />
		<meta name="viewport" content="user-scalable=no, initial-scale=1"/>
		<meta class="foundation-mq-small">
		<meta class="foundation-mq-medium">
		<meta class="foundation-mq-large">

		<link href='http://fonts.googleapis.com/css?family=PT+Sans:400,700' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="css/reset.css"> <!-- CSS reset -->
		<link rel="stylesheet" href="css/style.css"> <!-- Resource style -->
		<link rel="stylesheet" href="css/normalize.css" />
		<link rel="stylesheet" href="css/base.css" />

		<!-- Put in SASS -->
		<style>
			#BoxType2_PriceGrid,.package2,#BoxType3_PriceGrid,.package3,.TVAdditionalSubsType_Optional,.BroadbandType_Optional,.TalkType_Optional,.EquipBoxType_Optional,.AdditionalType_Optional		,.TVAdditionalSubsType1_PriceGrid tr,.BroadbandType1_PriceGrid tr,.TalkType1_PriceGrid tr,.EquipBoxType1_PriceGrid tr,.AdditionalType1_PriceGrid tr,.restricted, .hasData, .buyingGrid,.Equip_New,.OneOffTab { display:none; }

			table tr td{border-collapse;}

			table, td { border: 1px solid #ccc;
						border-collapse: collapse;
						padding: 2px;
						outline: none;}

			.oneOff {color:#9494b8; font-style:italic;}
			.whiteout {color:white;}


			.tab-title {font-weight:bold;}


		</style>

	</head>

	<body>
		<article>
			<div class="row">
				<div class="large-12 medium-12 small-12 columns scroller">
					<div class="panel">
						<div id="content" class="minheight">

							<!-- Tool Title  -->
							<div class="row">
								<div class="large-10 medium-8 small-7 columns">
									<h1>Package Price Calculator</h1>
								</div>

								<!-- Region UK/ROI -->
								<div class="large-2 medium-4 small-5 columns">
									<div class="switch radius right">
										<input id="exampleCheckboxSwitch" type="checkbox" class="UKROI">UK<label for="exampleCheckboxSwitch"></label>ROI
									</div>
								</div>
							</div>
							<div class="row">
								<div class="large-8 medium-12 small-12 columns">

									<!-- Timeframe prices values must correspond with the folders in the content file structure -->
									<select id="DateRange" class="GridSelect" size="1">
										<option value="P4">from 1st December 2016</option>
										<option value="P1" selected>16th August - 1st December 2016</option>
										<option value="P2">up to 15th August 2016</option>
										<option value="P3">up to 31st May 2016</option>
										<!-- Should be populated from a .csv -->
									</select>

									<!-- Customer Type -->
									<select id="CustomerType" class="GridSelect" size="1">
										<option value="A">New Customer</option>
										<option value="B">Existing Customer</option>
										<!-- Should be populated from a .csv -->
									</select>
								</div>
							</div>

							<!-- Top Tabs -->
							<div class="row">
								<div class="large-8 medium-12 small-12 columns">
									<!-- Main Tabs -->
									<ul id="maintabs" class="tabs main" data-tab>
										<li id="0" class="tab-title main active"><a href="#panel0" data-content="TV">TV (<span class="poundTab"></span><span class="TotalTb TV_TotalCost">0.00</span>)</a></li>
										<li id="A" class="tab-title main"><a href="#panel1" data-content="Broadband">Broadband (<span class="poundTab"></span><span class="TotalTb BB_TotalCost">0.00</span>)</a></li>
										<li id="B" class="tab-title main"><a href="#panel2" data-content="Talk">Talk (<span class="poundTab"></span><span class="TotalTb TK_TotalCost">0.00</span>)</a></li>
										<li id="D" class="tab-title main"><a href="#panel3" data-content="Equipment">Other (<span class="poundTab"></span><span class="TotalTb EQ_TotalCost">0.00</span>)</a></li>
									</ul>

									<!-- Content Div -->
									<div class="tabs-content main">

										<!-- TV Tab -->
										<div class="content active" id="panel0" data-content="Standalone">

											<div class="row">
												<div class="large-12 medium-12 small-12 columns">
													<!-- TV: Entertainment Bundle Total -->
													<h2>Entertainment Bundle <div class="BoxType_TotalCost inline"><span class="poundTab"></span><span id="BoxTypeTab" class="TVSum TotalSum">0.00</span></div></h2>

													<!-- TV: Entertainment Bundle Selection -->
													<div id="panel1a" class="content active">
														<!-- Switch Price Grid option 1 is Sky Q, Option 2 is Sky TV, option 3 is Legacy -->
														<select id="BoxType" class="GridSelect" size="1">
															<option value="1" selected>Sky Q Boxes</option>
															<option value="2">Sky TV Boxes</option>
															<!-- where is 3 coming from? -->
														</select>

														<!--TV: Sky Q Price Grid  (boxtype option 1)-->
														<div class="BoxTypeRows" id="BoxTypeRows1">
															<table id="BoxType1_PriceGrid" class="EPriceGrd selectHack">
																<thead>
																	<tr>
																		<th title="Package" class="tableTopTh">Package</th>
																		<th title="Basic" class="tableTopTh">Basic</th>
																		<th title="Basic with Sky Cinema" class="tableTopTh">+ Sky Cinema</th>
																		<th title="Basic with Sky Sports" class="tableTopTh">+ Sky Sports</th>
																		<th title="Basic with Sky Sports and Cinema" class="tableTopTh">+ Sky Sports and Cinema</th>
																	</tr>
																</thead>
																<tbody class="regionalSwitch">
																	<!-- Filled in by JS from [region]_EntPrices.csv file in data subfolder -->
																</tbody>
															</table>
														</div>
														
														<div id="priceTable"> </div>

														<!--TV: Sky TV Price Grid  (boxtype option 2) -->
														<div class="BoxTypeRows" id="BoxTypeRows2">
															<table id="BoxType2_PriceGrid" class="EPriceGrd selectHack">
																<thead>
																	<tr>
																		<th title="Package" class="tableTopTh">Package</th>
																		<th title="Basic" class="tableTopTh">Basic</th>
																		<th title="SkyCinema" class="tableTopTh">Sky Cinema</th>
																		<th title="SkySports" class="tableTopTh">Sky Sports</th>
																		<th title="SkySportsandCinema" class="tableTopTh">Sky Sports and Cinema</th>
																	</tr>
																</thead>
																<tbody class="regionalSwitch">
																 <!-- Filled in by JS from [region]_EntPrices.csv file in data subfolder -->
																</tbody>
															</table>
														</div>

														<!--TV: Sky TV Legacy Price Grid - (boxtype option 3) -->
														<div class="BoxTypeRows" id="BoxTypeRows3">
															<table id="BoxType3_PriceGrid" class="EPriceGrd selectHack">
																<thead>
																	<tr>
																		<th title="Package" class="tableTopTh">Package</th>
																		<th title="Basic" class="tableTopTh">Basic</th>
																		<th title="SkyCinema" class="tableTopTh">Sky Cinema</th>
																		<th title="SkySports" class="tableTopTh">Sky Sports</th>
																		<th title="SkySportsandCinema" class="tableTopTh">Sky Sports and Cinema</th>
																	</tr>
																</thead>
																<tbody class="regionalSwitch">
																	<!-- Filled in by JS from [region]_EntPrices.csv file in data subfolder -->
																</tbody>
															</table>
														</div>

														<!-- TV: Description of selected entertainment package -->
														<p id="HelpTxt" class="strong text-center">-- Please select a price from the Grid -- </p>

														<!-- TV: Entertainment Bundle Discount table -->
														<table id="BoxType_Discounts" class="tableFirst selectHack">
															<thead>
																<tr>
																	<th class="tableTopTh" width="40%" class="BoxTypeDiscount_col1">Discount for..</th>
																	<th class="tableTopTh" width="10%" class="BoxTypeDiscount_col2">Amount</th>
																	<th class="tableTopTh"  width="10%">Type</th>
																	<th class="tableTopTh" width="30%">Applied to..</th>
																	<th class="tableTopTh"></th>
																</tr>
															</thead>
															<tbody>
																<tr>
																	<td><input type="text" placeholder="Reason for Discount"/></td>
																	<td><input type="number" class="amountinput" placeholder="0" /></td>
																	<td>
																		<select type="select" name="DiscountType" size="1">
																			<option value="1" selected>%</option>
																			<option value="2"><span class="pound">&pound;</span> / <span class="euro">&euro;</span></option>
																		</select>
																	</td>
																	<td>
																		<!-- TV: Column Specific Discount variables -->
																		<select type="select" id="PackageType" name="PackageType" size="1">
																			<option value="CX" selected>All</option>
																			<option value="C0">Basic (ONLY)</option>
																			<option value="C4">Sky Cinema (ONLY)</option>
																			<option value="C5">Sky Sports (ONLY)</option>
																			<option value="C6">Sky Sports and Cinema (ONLY)</option>
																		</select>
																	</td>
																	<!-- Rows managed in JS -->
																	<td><p class="editRow addRow"><i title="Add" class="fa icon-plus tableIcon "></i></p></td>
																</tr>
															</tbody>
														</table>

														<!-- TV: Channel Reference (Nice to have) -->
													</div>
												</div>
											</div>

											<div class="row">
												<div class="large-12 medium-12 small-12 columns">

													<!-- TV: Additional Equipment Subscriptions -->
													<h2>Additional Viewing Features <div class="AdditionalType_TotalCost inline"><span class="poundTab"></span><span id="AdditionalTypeTab" class="TotalSum">0.00</span></div></h2>

													<div id="panel2b" class="content">
														<select id="AdditionalType" class="GridSelect" size="1">
															<option value="0">Not Selected</option>
															<!-- Populated from [region]_AdditionalPrices.csv -->
														</select>

														<!--TV: Additional Prices Grid -->
														<div class="border AdditionalType_Optional">
															<table id="AdditionalType1_PriceGrid">
																<thead>
																	<tr>
																		<th class="tableTopTh">Package(s)</th>
																		<th class="tableTopTh">Included Channel(s)</th>
																		<th class="tableTopTh">Price</th>
																	</tr>
																</thead>
																<tbody class="regionalSwitch multiScreenCheck">
																	<!-- Populated from [region]_AdditionalPrices.csv -->
																</tbody>
															</table>

															<!-- TV: Additional Price Discount Grid -->
															<table id="AdditionalType_Discount" class="tableFirst selectHack">
																<thead>
																	<tr>
																		<th class="tableTopTh" width="70%">Discount for..</th>
																		<th class="tableTopTh" width="10%">Amount</th>
																		<th class="tableTopTh" width="10%">Type</th>
																		<th class="tableTopTh"></th>
																	</tr>
																</thead>
																<tbody>
																	<tr>
																		<td><input type="text" placeholder="Reason for Discount"/></td>
																		<td><input type="number" class="amountinput" placeholder="0" /></td>
																		<td>
																			<select type="select" name="DiscountType" size="1">
																				<option value="1" selected>%</option>
																				<option value="2"><span class="pound">&pound;</span> / <span class="euro">&euro;</span></option>
																			</select>
																		</td>
																		<td><p class="editRow addRow"><i title="Add" class="fa icon-plus tableIcon "></i></p></td>
																	</tr>
																</tbody>
															</table>

															<div class="small-4 small-centered columns">
																<input id="AdditionalButton" type="button" value="Add Subscription" class="button tiny addSub radius">
															</div>
														</div>

														<!-- TV: Other Bought Subscriptions Grid -->
														<table id="AdditionalType_Buying" class="buyingGrid">
															<thead>
																<tr>
																	<th class="tableTopTh">Package(s)</th>
																	<th class="tableTopTh">Included Channel(s) / Notes</th>
																	<th class="tableTopTh">Discount</th>
																	<th class="tableTopTh">Price</th>
																	<th class="tableTopTh"></th>
																</tr>
															</thead>
															<tbody class="regionalSwitch">
																<!-- Populated By Add Subscription -->
															</tbody>
														</table>
													</div>
												</div>

												<div class="large-12 medium-12 small-12 columns">

													<!-- TV: Additional Subscriptions -->
													<h2>Additional Channels <div class="TVAdditionalSubsType_TotalCost inline"><span class="poundTab"></span><span id="TVAdditionalSubsTypeTab" class="TVSum TotalSum">0.00</span></div></h2>
													<div id="panel2a" class="content">
														<select id="TVAdditionalSubsType" class="GridSelect" size="1">
															<option value="0">Not Selected</option>
															<!-- Populated from [region]_ChannelPrices.csv -->
																<!-- MUST HAVE 'SKYQ MULTISCREEN' option as it's in the JS Logic -->
														</select>

														<!-- TV: Third Party Channels Pricing Grid -->
														<div class="border TVAdditionalSubsType_Optional">
															<table id="TVAdditionalSubsType1_PriceGrid">
																<thead>
																	<tr>
																		<th class="tableTopTh">Package(s)</th>
																		<th class="tableTopTh">Included Channel(s)</th>
																		<th class="tableTopTh">Price</th>
																	</tr>
																</thead>
																<tbody class="regionalSwitch">
																	<!-- Populated from [region]_ChannelPrices.csv -->
																</tbody>
															</table>

															<!-- TV: Third Party Channels Discount Grid -->
															<table id="TVAdditionalSubsType_Discount" class="tableFirst selectHack">
																<thead>
																	<tr>
																		<th class="tableTopTh" width="70%">Discount for..</th>
																		<th class="tableTopTh" width="10%">Amount</th>
																		<th class="tableTopTh" width="10%">Type</th>
																		<th class="tableTopTh"></th>
																	</tr>
																</thead>
																<tbody>
																	<tr>
																		<td><input type="text" placeholder="Reason for Discount"/></td>
																		<td><input type="number" class="amountinput" placeholder="0" /></td>
																		<td>
																			<select type="select" name="DiscountType" size="1">
																				<option value="1" selected>%</option>
																				<option value="2"><span class="pound">&pound;</span> / <span class="euro">&euro;</span></option>
																			</select>
																		</td>
																		<td><p class="editRow addRow"><i title="Add" class="fa icon-plus tableIcon "></i></p></td>
																	</tr>
																</tbody>
															</table>

															<!--TV: Add Third Party Channel Subscription -->
															<div class="small-4 small-centered columns">
																<input id="TVAdditionalSubsButton" type="button" value="Add Subscription" class="button tiny addSub radius">
															</div>
														</div>

														<!-- TV: Third Party Channels Bought Grid -->
														<table id="TVAdditionalSubsType_Buying" class="buyingGrid">
															<thead>
																<tr>
																	<th class="tableTopTh">Package(s)</th>
																	<th class="tableTopTh">Included Channel(s) / Notes</th>
																	<th class="tableTopTh">Discount</th>
																	<th class="tableTopTh">Price</th>
																	<th class="tableTopTh"></th>
																</tr>
															</thead>
															<tbody class="regionalSwitch">
																<!-- Populated By Add Subscription button / JS -->
															</tbody>
														</table>
													</div>
												</div>
											</div>
										</div>

										<!-- Broadband Tab -->
										<div class="content" id="panel1" data-content="Packages">
											<!-- Broadband Total -->
											<h2>Broadband <div class="OtherType_TotalCost inline"><span class="poundTab"></span><span id="BroadbandTypeTab" class="TotalSum">0.00</span></div></h2>

											<!-- BB: Broadband Selections -->
											<select id="BroadbandType" class="GridSelect" size="1">
												<option value="0">Not Selected</option>
													<!-- Populated from [region]_Broadband]Prices.csv -->
											</select>

												<!-- BB: Broadband Grid -->
											<div class="border BroadbandType_Optional">
												<table id="BroadbandType1_PriceGrid">
													<thead>
														<tr>
															<th class="tableTopTh">Package(s)</th>
															<th class="tableTopTh">Requirements</th>
															<th class="tableTopTh">Price</th>
														</tr>
													</thead>
													<tbody class="regionalSwitch">
														<!-- Populated from [region]_BroadbandPrices.csv -->
													</tbody>
												</table>

												<!-- 	BB: Broadband Discount Grid -->
												<table id="BroadbandType_Discount" class="tableFirst selectHack">
													<thead>
														<tr>
															<th class="tableTopTh" width="50%">Discount for..</th>
															<th class="tableTopTh" width="10%">Amount</th>
															<th class="tableTopTh" width="10%">Type</th>
															<th class="tableTopTh"></th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td><input type="text" placeholder="Reason for Discount"/></td>
															<td><input type="number" class="amountinput" placeholder="0" /></td>
															<td>
																<select type="select" name="DiscountType" size="1">
																	<option value="1" selected>%</option>
																	<option value="2"><span class="pound">&pound;</span> / <span class="euro">&euro;</span></option>
																</select>
															</td>
															<td><p class="editRow addRow"><i title="Add" class="fa icon-plus tableIcon "></i></p></td>
														</tr>
													</tbody>
												</table>

													<!-- 	BB:  Broadband Add Subscription  -->
												<div class="small-4 small-centered columns">
													<input id="BroadbandButton" type="button" value="Add Subscription" class="button tiny addSub radius">
												</div>
											</div>

										<!-- 	BB:  Broadband Bought Subscriptions Grid -->
											<table id="BroadbandType_Buying" class="buyingGrid">
												<thead>
													<tr>
														<th title="" class="tableTopTh">Package(s)</th>
														<th title="SkyCinema" class="tableTopTh">Included Channel(s) / Notes</th>
														<th class="tableTopTh">Discount</th>
														<th title="SkySports" class="tableTopTh">Price</th>
														<th class="tableTopTh"></th>
													</tr>
												</thead>
												<tbody class="regionalSwitch">
													<!-- Populated By Add Subscription button / JS -->
												</tbody>
											</table>
										</div>

										<!-- Talk Tab -->
										<div class="content" id="panel2" data-content="Packages">
											<!-- TK: Talk Total -->
											<h2>Talk <div class="TalkType_TotalCost inline"><span class="poundTab"></span><span id="TalkTypeTab" class="TotalSum">0.00</span></div></h2>

											<!-- TK: Talk selection options -->
											<select id="TalkType" class="GridSelect" size="1">
												<option value="0">Not Selected</option>
													<!-- Populated from [region]_TalkPrices.csv -->
											</select>

											<!-- TK: Talk subscriptions grid -->
											<div class="border TalkType_Optional">
												<table id="TalkType1_PriceGrid">
													<thead>
														<tr>
															<th class="tableTopTh">Package(s)</th>
															<th class="tableTopTh">Requirements</th>
															<th class="tableTopTh">Price</th>
														</tr>
													</thead>
													<tbody class="regionalSwitch">
														<!-- Populated from [region]_TalkPrices.csv -->
													</tbody>
												</table>

												<!-- TK: Other Subscriptions Discount Grid -->
												<table id="TalkType_Discount" class="tableFirst selectHack">
													<thead>
														<tr>
															<th class="tableTopTh" width="50%">Discount for..</th>
															<th class="tableTopTh" width="10%">Amount</th>
															<th class="tableTopTh" width="10%">Type</th>
															<th class="tableTopTh"></th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td><input type="text" placeholder="Reason for Discount"/></td>
															<td><input type="number" class="amountinput" placeholder="0" /></td>
															<td>
																<select type="select" name="DiscountType" size="1">
																	<option value="1" selected>%</option>
																	<option value="2"><span class="pound">&pound;</span> / <span class="euro">&euro;</span></option>
																</select>
															</td>
															<td><p class="editRow addRow"><i title="Add" class="fa icon-plus tableIcon "></i></p></td>
														</tr>
													</tbody>
												</table>

												<!-- TK: Add Talk Subscription -->
												<div class="small-4 small-centered columns">
													<input id="TalkButton" type="button" value="Add Subscription" class="button tiny addSub radius">
												</div>
											</div>

											<!-- TK: Talk Bought Subscriptions Grid -->
											<table id="TalkType_Buying" class="buyingGrid">
												<thead>
													<tr>
														<th title="" class="tableTopTh">Package(s)</th>
														<th title="SkyCinema" class="tableTopTh">Included Channel(s)</th>
														<th class="tableTopTh">Discount</th>
														<th title="SkySports" class="tableTopTh">Price</th>
														<th class="tableTopTh"></th>
													</tr>
												</thead>
												<tbody class="regionalSwitch">
													<!-- Populated By Add Subscription button -->
												</tbody>
											</table>
										</div>

										<!-- Other Tab -->
										<div class="content" id="panel3"  data-content="equipment">
											<div class="row">
												<div class="large-12 medium-12 small-12 columns">

													<!-- OT: installation & Equipment (One Off Box Prices) -->
													<h2>Installation &amp; Setup (One-Off Charges) <div class="EquipBoxType_TotalCost inline"><span class="poundTab"></span><span id="EquipBoxTypeTab">0.00</span></div></h2>

													<p>Installation costs are a one off charge, any additional subscriptions are applicable monthly.
													   In some instances customers must take the Sky Q Multiscreen subscription with their
													   choice (this is a recurring monthly cost). </p>

													<!--OT: Box selection -->
													<select id="EquipBoxType" class="GridSelect" size="1">
														<option value="0">Not Selected</option>
														<!-- Populated from [region]_BoxPrices.csv -->
														<!-- MUST HAVE 'MINIBOX' option as it's in the JS Logic to demand Multiscreen be applied-->
													</select>

													<div class="border EquipBoxType_Optional">
														<table id="EquipBoxType1_PriceGrid">
															<thead>
																<tr>
																	<th class="tableTopTh">Product</th>
																	<th class="tableTopTh">Price</th>
																</tr>
															</thead>
															<tbody class="regionalSwitch">
																	<!-- Populated from [region]_BoxPrices.csv -->
															</tbody>
														</table>

														<!-- OT: Equipment Discount Grid -->
														<table id="EquipBoxType_Discount" class="tableFirst selectHack">
															<thead>
																<tr>
																	<th class="tableTopTh" width="50%">Discount for..</th>
																	<th class="tableTopTh" width="10%">Amount</th>
																	<th class="tableTopTh" width="10%">Type</th>
																	<th class="tableTopTh"></th>
																</tr>
															</thead>
															<tbody>
																<tr>
																	<td><input type="text" placeholder="Reason for Discount"/></td>
																	<td><input type="number" class="amountinput" placeholder="0" /></td>
																	<td>
																		<select type="select" name="DiscountType" size="1">
																			<option value="1" selected>%</option>
																			<option value="2"><span class="pound">&pound;</span> / <span class="euro">&euro;</span></option>
																		</select>
																	</td>
																	<td><p class="editRow addRow"><i title="Add" class="fa icon-plus tableIcon "></i></p></td>
																</tr>
															</tbody>
														</table>

														<!-- OT: Apply Equipment Subscription -->
														<div class="small-4 small-centered columns">
															<input id="EquipBoxButton" type="button" value="Add Product" class="button tiny addSub radius">
														</div>
													</div>

													<!-- OT: Equipment Bought Grid -->
													<table id="EquipBoxType_Buying" class="buyingGrid">
															<thead>
																<tr>
																	<th class="tableTopTh">Product</th>
																	<th class="tableTopTh">Price</th>
																	<th class="tableTopTh">Discount</th>
																	<th class="tableTopTh"></th>
																</tr>
														</thead>
														<tbody class="regionalSwitch">
															<!-- Populated By Add Subscription button -->
														</tbody>
													</table>
												</div>


											</div>
										</div>
									</div>
								</div>

								<!-- Totals  -->
								<div class="large-4 medium-12 small-12 columns">
									<div class="panel smaller">
										<h2>Costs</h2>
										<ul>
											<li>
												<div class="row">
												  <div class="large-9 medium-9 small-9 columns">TV package</div> <div class="large-3 medium-3 small-3 columns"><span class="poundTab"></span><span class="TotalTb TV_TotalCost">0.00</span></div>
												  <div class="large-9 medium-9 small-9 columns">Broadband Package</div> <div class="large-3 medium-3 small-3 columns"> <span class="poundTab"></span><span class="TotalTb BB_TotalCost">0.00</span></div>
												  <div class="large-9 medium-9 small-9 columns">	Talk Package </div> <div class="large-3 medium-3 small-3 columns"><span class="poundTab"></span><span class="TotalTb TK_TotalCost">0.00</span></div>
												  <div class="large-9 medium-9 small-9 columns"><span data-content="Other" href="#" class="dummTab"> Monthly Bill:</div> <div class="large-3 medium-3 small-3 columns"><span class="dummTab"><span class="poundTab"></span><span id="TotalTab1" class="TotalTb">0.00</span></span></span> </div>
												</div>
											</li>
											<hr>
											<li>
												<div class="row">
													<div class="large-9 medium-9 small-9 columns">Installation &amp; Set Up</div><div class="large-3 medium-3 small-3 columns"> <span class="poundTab"></span><span class="TotalTb EQ_TotalCost">0.00</span></div>
													<div class="large-9 medium-9 small-9 columns"><span data-content="Other" href="#" class="dummTab">One Off Payment: </div> <div class="large-3 medium-3 small-3 columns"><span class="dummTab"><span class="poundTab"></span><span id="TotalTab2" class="TotalTb">0.00</span></span></span></div>
												</div>
											</li>
										</ul>
									</div>

									<input class="reset" type=button id="reset" value="Reset">
								</div>
							</div>
						</div>
					</div>
				</div>
			<a href="#" class="back-to-top">&nbsp;</a>
			</div>
		</article>

		<!-- /content -->

		<script src="js/basket.js"></script><!-- speed up JS conversion -->
		<script src="js/features.js"></script>

	</body>
</html>