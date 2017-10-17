<template>
	<div>
		<div class="h-r-title">{{$t('orderCenter.cancelOrder')}}</div>
		<div class="help-content" v-if="$i18n.locale == 'zh_CN'">
			<div>
				<p>1、亲爱的用户，首先您需要登录tpimkp.com商城。</p>
				<img src="../../../img/helpCenter/login (4).png" alt="" />
			</div>
			<div>
				<p>2、进入首页，点击“我的订单”查看历史订单。</p>
				<img src="../../../img/helpCenter/order_bg_tu (3).png" alt="" />
			</div>
			<div>
				<p>3、如果您的订单处于“待确认”或“待付款”状态，您可以点击操作中的“取消订单”，重新选择其他商品。</p>
				<img src="../../../img/helpCenter/cancel_order_bg_tu (3).png" alt="" />
			</div>
		</div>

		<div class="help-content" v-if="$i18n.locale == 'en'">
			<div>
				<p>1、Dear users, first you need to log in tpimkp.com mall.</p>
				<img src="../../../img/helpCenter/login (4).png" alt="" />
			</div>
			<div>
				<p>2、Go to the homepage and click "My Orders" to view historical orders.</p>
				<img src="../../../img/helpCenter/order_bg_tu (3).png" alt="" />
			</div>
			<div>
				<p>3、If your order is in the "To be confirmed" or "Pending" status, you can click "Cancel Order" in the operation to re-select other items.</p>
				<img src="../../../img/helpCenter/cancel_order_bg_tu (3).png" alt="" />
			</div>
		</div>

		<div class="help-content" v-if="$i18n.locale == 'th'">
			<div>
				<p>1、เข้าสู่ระบบเว็บไซต์ของเรา。</p>
				<img src="../../../img/helpCenter/login (4).png" alt="" />
			</div>
			<div>
				<p>2、เข้าสู่หน้าแรก แล้วคลิก "ใบสั่งซื้อของฉัน" ตรวจดูประวัติการสั่งซื้อ。</p>
				<img src="../../../img/helpCenter/order_bg_tu (3).png" alt="" />
			</div>
			<div>
				<p>3、หากคำสั่งซื้อของคุณอยู่ในสถานะ "รอดำเนินการ" หรือ "รอการชำระเงิน" คุณสามารถคลิกดำเนินการ "ยกเลิกคำสั่งซื้อ" แล้วเลือกสินค้าอื่น ๆ อีกครั้ง。</p>
				<img src="../../../img/helpCenter/cancel_order_bg_tu (3).png" alt="" />
			</div>
		</div>

		<div class="help-content" v-if="$i18n.locale == 'lo'">
			<div>
				<p>1、ຊື່ຜູ້ໃຊ້ທີ່ຮັກແພງ ທໍາອິດທ່ານຈໍາເປັນຕ້ອງເຂົ້າສູ່ເວັບໄຊ້ຂອງພວກເຮົາ.</p>
				<img src="../../../img/helpCenter/login (4).png" alt="" />
			</div>
			<div>
				<p>2、ໃສ່ຫນ້າທໍາອິດແລະກົດ "ຄໍາສັ່ງຂອງຂ້ອຍ".</p>
				<img src="../../../img/helpCenter/order_bg_tu (3).png" alt="" />
			</div>
			<div>
				<p>3、ຖ້າຄໍາສັ່ງຂອງທ່ານຢູ່ໃນລັດ"ລໍຖ້າ"ຫຼື"ການຈ່າຍເງິນທີ່ຍັງຄ້າງ". "ຍົກເລີກຄໍາສັ່ງ" ແລ້ວເລືອກຜະລິດຕະພັນອື່ນອີກ.</p>
				<img src="../../../img/helpCenter/cancel_order_bg_tu (3).png" alt="" />
			</div>
		</div>

		<div class="help-content" v-if="$i18n.locale == 'my'">
			<div>
				<p>1、ခ်စ္ခင္ရပါေသာ အသံုးျပဳသူအတြက္ companyေမးလ္ ပထမဆံုးလိုအပ္ပါသည္</p>
				<img src="../../../img/helpCenter/login (4).png" alt="" />
			</div>
			<div>
				<p>2、”ကြ်ႏ္ုပ္ ကုန္စည္” ေရာက္ရွိခဲ့သည့္ေနရာမ်ားကိုျကည့္စံုစမ္းရန္ ပင္မစာမ်က္ႏွာသို ့သြားပါ။ကြ်ႏ္ုပ္ကုန္စည္ အတြက္ ဆိုင္းငံ့အတည္ျပဳခ်က္ (သို ့မဟုတ္) ဆိုင္းငံ့ေပးေခ်မွဳ စံုစမ္းျကည့္ရွဳ ႏိုင္ပါသည္။</p>
				<img src="../../../img/helpCenter/order_bg_tu (3).png" alt="" />
			</div>
			<div>
				<p>3、သင္သည္အျခားကုန္စည္ကို ျပန္လည္ေရြးခ်ယ္ခ်င္လွ်င္ သင္ဧ။္ကုန္စည္ေရြးခ်ယ္မွဳကို ပယ္ဖ်က္ ႏိုင္ပါသည္။</p>
				<img src="../../../img/helpCenter/cancel_order_bg_tu (3).png" alt="" />
			</div>
		</div>

	</div>
</template>
<script>
</script>
<style>

</style>
