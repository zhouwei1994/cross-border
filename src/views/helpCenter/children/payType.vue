<template>
	<div>
		<div class="h-r-title">{{$t('confirmOrder.paymentMethod')}}</div>
		<div class="help-content" v-if="$i18n.locale == 'zh_CN'">
			<p>
				<span class="main-color">*</span>线下银行汇款，在汇款前需提前与客服沟通确认支付金额</p>
			<div>
				<p>您可以通过以下账号进行支付</p>
			</div>
			<div class="bank-list">
				<div>
					<img src="../../../img/helpCenter/help-center_payment_pic1.png" alt="" />
					<span>KRUNGSRI</span>
				</div>
				<div>
					<img src="../../../img/helpCenter/help-center_payment_pic2.png" alt="" />
					<span>TMB BANK PUBLIC COMPANY LIMITED</span>
				</div>
				<div>
					<img src="../../../img/helpCenter/help-center_payment_pic3.png" alt="" />
					<span>KASIKORNBANK</span>
				</div>
				<div>
					<img src="../../../img/helpCenter/help-center_payment_pic4.png" alt="" />
					<span>BANGKOK BANK</span>
				</div>
				<div>
					<img src="../../../img/helpCenter/help-center_payment_pic5.png" alt="" />
					<span>SIAM COMMERCIAL BANK PUBLIC COMPANY LIMITED</span>
				</div>
			</div>
			<div>
				<p>如果完成转账后请及时通知我们相关转账信息：</p>
				<p>
					<span>通知方式：</span>1、登录我们商场，在首页中点击进入“我的订单”页面，点击“已完成付款”</p>
				<p>
					<span class="ui-vh">通知方式：</span>2、通过在线客服联系我们</p>
				<p>相关转账信息：转账人账户/银行账号/账户号名，商品订单号，转账时间</p>
			</div>
		</div>

		<div class="help-content" v-if="$i18n.locale == 'en'">
			<p>
				<span class="main-color">*</span>Line bank remittance, in advance before the remittance and customer service to confirm the amount of payment</p>
			<div>
				<p>You can pay by the following account</p>
			</div>
			<div class="bank-list">
				<div>
					<img src="../../../img/helpCenter/help-center_payment_pic1.png" alt="" />
					<span>KRUNGSRI</span>
				</div>
				<div>
					<img src="../../../img/helpCenter/help-center_payment_pic2.png" alt="" />
					<span>TMB BANK PUBLIC COMPANY LIMITED</span>
				</div>
				<div>
					<img src="../../../img/helpCenter/help-center_payment_pic3.png" alt="" />
					<span>KASIKORNBANK</span>
				</div>
				<div>
					<img src="../../../img/helpCenter/help-center_payment_pic4.png" alt="" />
					<span>BANGKOK BANK</span>
				</div>
				<div>
					<img src="../../../img/helpCenter/help-center_payment_pic5.png" alt="" />
					<span>SIAM COMMERCIAL BANK PUBLIC COMPANY LIMITED</span>
				</div>
			</div>
			<div>
				<p>If you need to complete the transfer, please inform us of the relevant transfer information:</p>
				<p>
					<span>Notice:</span>1、Log in to our mall, click on the home page to enter the "My Orders" page, click "Completed Payment"</p>
				<p>
					<span class="ui-vh">Notice:</span>2、Contact us through online customer service</p>
				<p>Related transfer information: Transactor account / bank account number / account number, merchandise order number, transfer time</p>
			</div>
		</div>

		<div class="help-content" v-if="$i18n.locale == 'th'">
			<p>
				<span class="main-color">*</span>การโอนเงินผ่านธนาคาร ต้องทำการติดต่อกับฝ่ายบริการลูกค้าล่วงหน้าเพื่อยืนยันจำนวนที่จะชำระเงิน</p>
			<div>
				<p>คุณสามารถชำระเงินด้วยบัญชีต่อไปนี้</p>
			</div>
			<div class="bank-list">
				<div>
					<img src="../../../img/helpCenter/help-center_payment_pic1.png" alt="" />
					<span>KRUNGSRI</span>
				</div>
				<div>
					<img src="../../../img/helpCenter/help-center_payment_pic2.png" alt="" />
					<span>TMB BANK PUBLIC COMPANY LIMITED</span>
				</div>
				<div>
					<img src="../../../img/helpCenter/help-center_payment_pic3.png" alt="" />
					<span>KASIKORNBANK</span>
				</div>
				<div>
					<img src="../../../img/helpCenter/help-center_payment_pic4.png" alt="" />
					<span>BANGKOK BANK</span>
				</div>
				<div>
					<img src="../../../img/helpCenter/help-center_payment_pic5.png" alt="" />
					<span>SIAM COMMERCIAL BANK PUBLIC COMPANY LIMITED</span>
				</div>
			</div>
			<div>
				<p>หากคุณโอนเรียบร้อยแล้วโปรดแจ้งข้อมูลการโอนที่เกี่ยวข้องกับเรา:</p>
				<p>
					<span>วิธีการแจ้ง：</span>1、เข้าสู่ระบบ คลิกที่หน้าแรก คลิกเพื่อไปที่หน้าคำสั่งซื้อของฉันและคลิก "การชำระเงินที่เสร็จสมบูรณ์"</p>
				<p>
					<span class="ui-vh">วิธีการแจ้ง：</span>2、ติดต่อผ่านฝ่ายบริการลูกค้าของเรา</p>
				<p>ข้อมูลการโอนที่เกี่ยวข้อง : บัญชีโอน / เลขที่บัญชี / ชื่อบัญชี เลขที่ใบสั่งซื้อ เวลาที่โอนเงิน</p>
			</div>
		</div>

		<div class="help-content" v-if="$i18n.locale == 'lo'">
			<p>
				<span class="main-color">*</span>ການໂອນທາງທະນາຄານ.ກະລຸນາຕິດຕໍ່ບໍລິການລູກຄ້າລ່ວງຫນ້າເພື່ອຢືນຢັນ ການຈ່າຍເງິນ.
			</p>
			<div>
				<p>ທ່ານສາມາດເຮັດການຈ່າຍເງິນດ້ວຍບັນຊີຕໍ່ໄປນີ້. </p>
			</div>
			<div class="bank-list">
				<div>
					<img src="../../../img/helpCenter/help-center_payment_pic1.png" alt="" />
					<span>KRUNGSRI</span>
				</div>
				<div>
					<img src="../../../img/helpCenter/help-center_payment_pic2.png" alt="" />
					<span>TMB BANK PUBLIC COMPANY LIMITED</span>
				</div>
				<div>
					<img src="../../../img/helpCenter/help-center_payment_pic3.png" alt="" />
					<span>KASIKORNBANK</span>
				</div>
				<div>
					<img src="../../../img/helpCenter/help-center_payment_pic4.png" alt="" />
					<span>BANGKOK BANK</span>
				</div>
				<div>
					<img src="../../../img/helpCenter/help-center_payment_pic5.png" alt="" />
					<span>SIAM COMMERCIAL BANK PUBLIC COMPANY LIMITED</span>
				</div>
			</div>
			<div>
				<p>ຖ້າທ່ານໄດ້ໂອນເງິນຜົນສໍາເລັດແລ້ວ, ກະລຸນາໃຫ້ພວກເຮົາມີຂໍ້ມູນການໂອນທີ່ກ່ຽວຂ້ອງ:</p>
				<p>
					<span>ວິທີການແຈ້ງເຕືອນ:</span>1、ເຂົ້າສູ່ລະບົບຄິກທີ່ບ້ານກົດເພື່ອໄປທີ່ຫນ້າຄໍາສັ່ງຂອງຂ້ອຍແລະຄລິກໃສ່. " ຈ່າຍເງິນຮຽບຮ້ອຍແລ້ວ "
				</p>
				<p>
					<span class="ui-vh">ວິທີການແຈ້ງເຕືອນ:</span>2、ຕິດຕໍ່ໂດຍຜ່ານການບໍລິການລູກຄ້າຂອງພວກເຮົາ.</p>
				<p>ຂໍ້ມູນການໂອນທີ່ກ່ຽວຂ້ອງ:ໂອນບັນຊີ / ເລກບັນຊີທະນາຄານ / ຊື່ເລກບັນຊີ ເວລາການໂອນ</p>
			</div>
		</div>

		<div class="help-content" v-if="$i18n.locale == 'my'">
			<p><span class="main-color">*</span>ဘဏ္ေငြလႊဲျခင္း </p>
			<div>
				<p>ၾကိုတင္ေဖာက္သည္ ၀န္ေဆာင္မွဳႏွင့္ ေငြလႊဲေပးေခ်မွဳပမာဏကို အတည္မျပဳမီ သင့္အေနျဖင့္ ေအာက္ပါအေကာင့္မွ တဆင့္ဆက္သြယ္ေပးေဆာင္ႏိုင္ပါသည္။</p>
			</div>
			<div class="bank-list">
				<div>
					<img src="../../../img/helpCenter/help-center_payment_pic1.png" alt="" />
					<span>KRUNGSRI</span>
				</div>
				<div>
					<img src="../../../img/helpCenter/help-center_payment_pic2.png" alt="" />
					<span>TMB BANK PUBLIC COMPANY LIMITED</span>
				</div>
        <div>
					<img src="../../../img/helpCenter/help-center_payment_pic3.png" alt="" />
					<span>KASIKORNBANK</span>
				</div>
				<div>
					<img src="../../../img/helpCenter/help-center_payment_pic4.png" alt="" />
					<span>BANGKOK BANK</span>
				</div>
        <div>
					<img src="../../../img/helpCenter/help-center_payment_pic5.png" alt="" />
					<span>SIAM COMMERCIAL BANK PUBLIC COMPANY LIMITED</span>
				</div>
			</div>
			<div>
				<p>ျပီးျပည့္စံုေသာလႊဲေျပာင္းမွဳႏွင့္ဆက္စပ္ေသာသတင္းအခ်က္အလက္ ကိုလႊဲေျပာင္းျပီး ကြ်ႏ္ုပ္တို ့companyဘက္အားအေၾကာင္းၾကားေပးပါ။:</p>
				<p><span>အေၾကာင္းၾကားျခင္း</span>1、"ကြှနျုပျ၏အမိန့်" စာမျက်နှာပေါ်တွင် home page ကိုကလစ်မှာငါတို့စတိုးဆိုင်များသွားရောက်ကြည့်ရှုသည်ကို click "ပွညျ့စုံ၏ငွေပေးချေမှု။ "</p>
				<p><span class="ui-vh">အေၾကာင္းၾကားျခင္း</span>2、တိုက်ရိုက်စကားပြောခြင်းအားဖြင့်ကျွန်တော်တို့ကိုဆက်သွယ်ပါ</p>
				<p>ဆက်စပ်သတင်းအချက်အလက်လွှဲပြောင်း: လွှဲပြောင်းရဲ့အကောင့် / ဘဏ်အကောင့် / အကောင့်အရေအတွက်ကအမည်, ကုန်ပစ္စည်းမှာယူမှုနံပါတ်, လွှဲပြောင်းအချိန်</p>
			</div>
		</div>

	</div>
</template>
<script>
</script>
<style lang="scss" scoped>
.bank-list {
	margin-bottom: 30px;
	display: flex;
	flex-wrap: wrap;
	div {
		width: 50%;
		margin-top: 58px;
		img {
			margin: 0 0 6px;
		}
		span {
			margin-left: 25px;
			font-size: 14px;
			color: #4d4d4d;
			display: block;
			line-height: 24px;
		}
	}
	div:nth-of-type(odd) {
		// margin-right: 88px;
	}
	div:nth-child(1),
	div:nth-child(2) {
		margin-top: 0px;
	}
}
</style>
