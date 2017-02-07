if (csv == "../getData.php?tbl=data/p1_UK_EntPrices") 
{
	$.each(data, function(i, item)
	{
		var pack = item[5];
		var basic = item[6];
		var cinema = item[7];
		var SandC = item[8];
		
		populateGrid(pack, basic, cinema, SandC, sport);
	}
}

if (csv == "../getData.php?tbl=data/p1_data/P1/UK_BroadbandPrices")
{
	
	$.each(data, function(i, item)
	{
		var broadpack = item[7];
		var broadregion = item[5];
		var broadcond = item[8];
		var broadprice = item[9];
		
		populateGrid(broadpack, broadregion, broadcond, broadprice);
	}
}

if (csv == "../getData.php?tbl=data/p1_UK_TalkPrices")
{
	
	$.each(data, function(i, item)
	{
		var talkpack = item[7];
		var talkregion = item[5];
		var talkcond = item[8];
		var talkprice = item[9];
		
		populateGrid(talkpack, talkregion, talkcond, talkprice);
	}
}
	
		