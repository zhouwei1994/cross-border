<template>
	<div>
		<div class="h-r-title">{{$t('buyingGuide.transportInstructions')}}</div>
		<div class="help-content" v-if="$i18n.locale == 'zh_CN'">
			<div>
				<p>1、运输方式：海陆两种运输方式(中国境内物流，国际TPI物流）</p>
				<img src="../../../img/helpCenter/transport-bg-1.png" alt="" />
				<img src="../../../img/helpCenter/transport-bg-2.png" alt="" />
			</div>
			<div>
				<p>2、海关关税：运输物流费中包含关税费用，（注：我公司不承运的物品有液体、食品、药品、名牌。）</p>
				<div class="remark">
					<div class="r-item">
						<span class="ic-r-liquor"></span>
						<p>我公司不承运的物品有液体，食品，药品，名牌</p>
					</div>
					<div class="r-item">
						<span class="ic-r-customs"></span>
						<p>运输物流费用中包含中-泰进口清关</p>
					</div>
				</div>
			</div>
		</div>

		<div class="help-content" v-if="$i18n.locale == 'en'">
			<div>
				<p>1、Mode of transport: land and sea two modes of transport (China's domestic logistics, international TPI logistics)</p>
				<img src="../../../img/helpCenter/transport-bg-1.png" alt="" />
				<img src="../../../img/helpCenter/transport-bg-2.png" alt="" />
			</div>
			<div>
				<p>2、Customs duties: transport logistics costs include tariffs, (Note: I do not carry the goods are liquid, food, medicine, brand name.)</p>
				<div class="remark">
					<div class="r-item">
						<span class="ic-r-liquor"></span>
						<p>I do not transport the goods are liquid, food, medicine, brand name</p>
					</div>
					<div class="r-item">
						<span class="ic-r-customs"></span>
						<p>Transport logistics costs include import clearance</p>
					</div>
				</div>
			</div>
		</div>

		<div class="help-content" v-if="$i18n.locale == 'th'">
			<div>
				<p>1、รูปแบบของการขนส่ง:มีทางเรือและทางรถ 2 รูปแแบการขนส่ง(การขนส่งในประเทศจีน และTPI ขนส่งระหว่างประเทศ)</p>
				<img src="../../../img/helpCenter/transport-bg-1.png" alt="" />
				<img src="../../../img/helpCenter/transport-bg-2.png" alt="" />
			</div>
			<div>
				<p>2、ภาษีศุลกากร: ค่าภาษีอากรในค่าขนส่ง (หมายเหตุ:บริษัทเราไม่รับสินค้าสินค้าที่เป็นของเหลว อาหาร ผลิตภัณฑ์ยา สินค้าลิขสิทธิ์)</p>
				<div class="remark">
					<div class="r-item">
						<span class="ic-r-liquor"></span>
						<p>บริษัทเราไม่รับสินค้าสินค้าที่เป็นของเหลว อาหาร ผลิตภัณฑ์ยา สินค้าลิขสิทธิ์</p>
					</div>
					<div class="r-item">
						<span class="ic-r-customs"></span>
						<p>ค่าขนส่งรวมค่าการนำเข้าจีน-ไทยแล้ว</p>
					</div>
				</div>
			</div>
		</div>

		<div class="help-content" v-if="$i18n.locale == 'lo'">
			<div>
				<p>1、ຮູບແບບການຂົນສົ່ງ:ມີການຂົນສົ່ງທາງບົກແລະການຂົນສົ່ງທາງທະເລ (ການຂົນສົ່ງໃນຈີນແລະການຂົນສົ່ງສາກົນ TPI)</p>
				<img src="../../../img/helpCenter/transport-bg-1.png" alt="" />
				<img src="../../../img/helpCenter/transport-bg-2.png" alt="" />
			</div>
			<div>
				<p>2、ພາສີສຸລະກາກອນ:ຄ່າພາສີອາກອນໃນຄ່າຂົນສົ່ງ(ຫມາຍເຫດ:ພວກເຮົາບໍ່ຍອມຮັບສິນຄ້າທີ່ມີທາດແຫລວ, ອາຫານ, ຜະລິດຕະພັນຢາ, ຜະລິດຕະພັນລິຂະສິດ).</p>
				<div class="remark">
					<div class="r-item">
						<span class="ic-r-liquor"></span>
						<p>ບໍລິສັດຂອງພວກເຮົາບໍ່ຍອມຮັບເອົາສິນຄ້າມີທາດແຫລວ,ອາຫານ,ຜະລິດຕະພັນຢາ, ຜະລິດຕະພັນລິຂະສິດ</p>
					</div>
					<div class="r-item">
						<span class="ic-r-customs"></span>
						<p>ຄ່າຂົນສົ່ງລວມມີການນໍາເຂົ້າຈີນ - ໄທ.</p>
					</div>
				</div>
			</div>
		</div>

		<div class="help-content" v-if="$i18n.locale == 'my'">
			<div>
				<p>1、သယ်ယူပို့ဆောင်ရေးမုဒ်: ပင်လယ်နှင့်မြေယာသယ်ယူပို့ဆောင်ရေးနှစ်ခုသည် Modes (တရုတ်ပြည်တွင်းထောက်ပံ့ပို့ဆောင်ရေး, နိုင်ငံတကာထောက်ပံ့ပို့ဆောင်ရေး TPI)</p>
				<img src="../../../img/helpCenter/transport-bg-1.png" alt="" />
				<img src="../../../img/helpCenter/transport-bg-2.png" alt="" />
			</div>
			<div>
				<p>2、အကောက်ခွန်လုပ်ငန်းတာဝန်များ: သယ်ယူပို့ဆောင်ရေးနှင့်ထောက်ပံ့ပို့ဆောင်ရေးအခကြေးငွေအဆိုပါအခွန်ကုန်ကျစရိတ်များတွင်ပါဝင်သည်, (မှတ်ချက်: ကိုယ့်အရည်ပစ္စည်းများ, အစားအစာ, ဆေးဝါး, အမှတ်တံဆိပ်-name ကိုသယ်ကြဘူး)</p>
				<div class="remark">
					<div class="r-item">
						<span class="ic-r-liquor"></span>
						<p>ငါအရည်ပစ္စည်းများ, အစားအစာ, ဆေးဝါး, အမှတ်တံဆိပ်အမည်ဖြင့်သယ်ဆောင်ကြဘူး</p>
					</div>
					<div class="r-item">
						<span class="ic-r-customs"></span>
						<p>ထိုင်းသွင်းကုန်ရှင်းလင်းရေး - တွင်ထည့်သွင်းသယ်ယူပို့ဆောင်ရေးထောက်ပံ့ပို့ဆောင်ရေးကုန်ကျစရိတ်များ</p>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
</script>
<style lang="scss" scoped>
@import '../../../style/components/main';
.remark {
	@include clear;
	display: -webkit-box;
	display: -moz-box;
	min-height: 92px;
	.r-item {
		width: 100%;
		flex: 1;
		display: -webkit-box;
		display: -moz-box;
		-webkit-box-align: center;
		height: inherit;
		&>p {
			width: 100%;
			flex: 1;
			padding-right: 40px;
			padding-left: 20px;
			font-size: 12px;
			line-height: 20px;
		}
	}
}

.ic-r-customs {
	@include bindicBg(72px, 72px);
	background-image: url(../../../img/helpCenter/customs.png);
}

.ic-r-liquor {
	@include bindicBg(70px, 70px);
	background-image: url(../../../img/helpCenter/cost_bg_tu-7.png);
}
</style>
