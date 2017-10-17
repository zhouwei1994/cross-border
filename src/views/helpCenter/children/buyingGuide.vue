<template>
	<div>
		<div class="h-r-title">{{$t('tail.purchaseGuide')}}</div>
		<div class="help-content" v-if="$i18n.locale == 'zh_CN'">
			<div class="h-c-desc color-333">步骤：
				<span>1、账号登录</span>
				<span>2、挑选商品</span>
				<span>3、确认下单</span>
				<span>4、订单结算</span>
				<span>5、确认签收</span>
			</div>
			<div>
				<p>1、亲爱的用户，首先您需要进入我们商城，如果您有我们的账号请点击顶部导航栏“登录”，如果您没有我们的账号请点击“注册”</p>
				<img src="../../../img/helpCenter/buy_bg_tu (3).png" alt="" />
				<img src="../../../img/helpCenter/login (4).png" alt="" />
			</div>
			<div>
				<p>2、浏览商城的商品信息，或者直接在顶部导航搜索框输入您想购买的商品。选择您喜欢的商品并点击进入商品详情页，选择相应商品的规格尺寸点击“加入购物车”。如果还需要继续购买其他的商品，请前往其他页面挑选更多商品。</p>
				<img src="../../../img/helpCenter/buy_bg_tu (5).png" alt="" />
			</div>
			<div>
				<p>3、挑选完商品后进入“我的购物车”页面，确认所需购买的商品，提交结算。在此之前，您需要填写收货地址、与在线客服沟通确认相关运费事宜，确认完成后，线下转账完成付款。</p>
				<img src="../../../img/helpCenter/buy_bg_tu (6).png" alt="" />
				<img src="../../../img/helpCenter/buy_bg_tu (1).png" alt="" />
			</div>
			<div>
				<p>4、等待平台发货，确认签收。（平台发货后，用户可在“我的订单”中查看追踪物流信息。）</p>
				<img src="../../../img/helpCenter/buy_bg_tu (2).png" alt="" />
			</div>
		</div>

		<div class="help-content" v-if="$i18n.locale == 'en'">
			<div class="h-c-desc color-333">step：
				<span>1、Account login</span>
				<span>2、Pick the goods</span>
				<span>3、Confirm the order</span>
				<span>4、Order settlement</span>
				<span>5、Confirmation of receipt</span>
			</div>
			<div>
				<p>1、Dear users, first of all you need to enter our mall, if you have our account please click on the top navigation bar "login", if you do not have our account please click "register"</p>
				<img src="../../../img/helpCenter/buy_bg_tu (3).png" alt="" />
				<img src="../../../img/helpCenter/login (4).png" alt="" />
			</div>
			<div>
				<p>2、Browse the merchandise information for the mall or enter the item you want to buy directly at the top navigation search box. Select your favorite item and click into the product details page, select the appropriate size of the product click on the "Add to Cart". If you still need to continue to buy other products, please go to other pages to pick more goods.</p>
				<img src="../../../img/helpCenter/buy_bg_tu (5).png" alt="" />
			</div>
			<div>
				<p>3、After selecting the goods, go to the "My Shopping Cart" page and confirm the items you want to purchase. Prior to this, you need to fill out the shipping address, and online customer service to confirm the relevant freight matters, confirmed after the completion of line transfer to complete the payment.</p>
				<img src="../../../img/helpCenter/buy_bg_tu (6).png" alt="" />
				<img src="../../../img/helpCenter/buy_bg_tu (1).png" alt="" />
			</div>
			<div>
				<p>4、Wait for platform delivery, confirm receipt. (After the platform is shipped, the user can view the tracking logistics information in "My Order".)</p>
				<img src="../../../img/helpCenter/buy_bg_tu (2).png" alt="" />
			</div>
		</div>

		<div class="help-content" v-if="$i18n.locale == 'th'">
			<div class="h-c-desc color-333">ขั้นตอน:
				<span>1、เข้าสู่ระบบ</span>
				<span>2、เลือกสินค้า</span>
				<span>3、ยืนยันการสั่งซื้อ</span>
				<span>4、ชำระใบสั่งซื้อ</span>
				<span>5、ยืนยันการรับสินค้า</span>
			</div>
			<div>
				<p>1、เรียนผู้ใช้ อันดับแรกคุณต้องทำการเข้าสู่ระบบ หากคุณมีบัญชีของเราโปรดคลิกที่แถบนำทางด้านบน "login" หากคุณไม่มีบัญชีของเราโปรดคลิก "สมัครสมาชิก" กรุณาคลิกที่แถบการนำทางด้านบนที่ด้านบนขวา "login" หากคุณไม่มีบัญชีของเรากรุณาคลิก "ลงทะเบียน"
				</p>
				<img src="../../../img/helpCenter/buy_bg_tu (3).png" alt="" />
				<img src="../../../img/helpCenter/login (4).png" alt="" />
			</div>
			<div>
				<p>2、เรียกดูข้อมูลสินค้าในเว็บไซต์หรือใส่สินค้าที่คุณต้องการซื้อโดยตรงที่ช่องค้นหาด้านบน เลือกรายการที่คุณชื่นชอบและคลิกลงเข้าไปหน้ารายละเอียดสินค้า เลือกของสินค้าที่เกี่ยวข้อง คลิกที่ปุ่ม "เพิ่มในรถเข็น" หากคุณยังต้องการซื้อสินค้าอื่นต่อไป โปรดไปที่หน้าอื่น ๆ เพื่อรับสินค้าเพิ่ม 。
				</p>
				<img src="../../../img/helpCenter/buy_bg_tu (5).png" alt="" />
			</div>
			<div>
				<p>3、หลังจากเลือกสินค้าแล้วไปที่หน้า "รถเข็นของฉัน" และยืนยันรายการที่คุณต้องการซื้อ ส่งยอดที่ต้องชำระ ก่อนหน้านี้คุณต้องกรอกที่อยู่ในการจัดส่ง และติดต่อยืนยันค่าขนส่งที่เกี่ยวข้องกับแชทบริการลูกค้าออนไลน์ หลังจากยืนยัน ให้ทำการโอนเงินแบบออฟไลน์ชำระเงินให้เสร็จสมบูรณ์ 。
				</p>
				<img src="../../../img/helpCenter/buy_bg_tu (6).png" alt="" />
				<img src="../../../img/helpCenter/buy_bg_tu (1).png" alt="" />
			</div>
			<div>
				<p>4、รอการส่งสินค้าของเว็บไซต์ และยืนยันการรับสินค้า (หลังจากที่มีการจัดส่ง ผู้ใช้สามารถดูข้อมูลการติดตามการขนส่งได้ใน "ใบสั่งซื้อของฉัน")</p>
				<img src="../../../img/helpCenter/buy_bg_tu (2).png" alt="" />
			</div>
		</div>

		<div class="help-content" v-if="$i18n.locale == 'lo'">
			<div class="h-c-desc color-333">ຂັ້ນຕອນ：
				<span>1、ເຂົ້າສູ່ລະບົບ</span>
				<span>2、ເລືອກຜະລິດຕະພັນ</span>
				<span>3、ການຢືນຢັນຄໍາສັ່ງ</span>
				<span>4、ຄໍາສັ່ງຈ່າຍ</span>
				<span>5、ການຢືນຢັນຜະລິດຕະພັນ</span>
			</div>
			<div>
				<p>1、ຊື່ຜູ້ໃຊ້ທີ່ຮັກແພງ.ທໍາອິດທ່ານຈໍາເປັນຕ້ອງເຂົ້າສູ່ລະບົບ.ຖ້າທ່ານມີບັນຊີຂອງ ພວກເຮົາ,ກະລຸນາຄລິກໃສ່ແຖບນໍາທາງເທິງສຸດ"ເຂົ້າສູ່ລະບົບ".ຖ້າທ່ານບໍ່ມີບັນຊີຂອງພວກເຮົາ, ກະລຸນາຄລິກ"ລົງທະບຽນ"
				</p>
				<img src="../../../img/helpCenter/buy_bg_tu (3).png" alt="" />
				<img src="../../../img/helpCenter/login (4).png" alt="" />
			</div>
			<div>
				<p>2、ເບິ່ງຂໍ້ມູນຜະລິດຕະພັນທີ່ຢູ່ໃນເວັບໄຊຫຼືໃຫ້ຜະລິດຕະພັນທີ່ທ່ານຕ້ອງການຊື້ ໂດຍກົງໃນປ່ອງຊອກຫາຂ້າງເທິງ.ເລືອກລາຍການທີ່ມັກຂອງທ່ານແລະຄລິກໃສ່ຫນ້າລາຍລະອຽດຜະລິດຕະພັນ.ໃຫ້ຄລິກໃສ່ປຸ່ມ"ເພີ່ມໃນຕະກ້າ".ຖ້າທ່ານຢາກສືບຕໍ່ຊື້ເຄື່ອງ.ກະລຸນາໄປທີ່ຫນ້າອື່ນໆເພື່ອໃຫ້ໄດ້ຮັບຜະລິດຕະພັນເພີ່ມເຕີມ.
				</p>
				<img src="../../../img/helpCenter/buy_bg_tu (5).png" alt="" />
			</div>
			<div>
				<p>3、ຫຼັງຈາກເລືອກເອົາຜະລິດຕະພັນແລ້ວ,ແລະຫຼັງຈາກນັ້ນໄປຫາຫນ້າ."ລົດເຂັນຂອງຂ້ອຍ"ແລະຢືນຢັນລາຍການທີ່ທ່ານຕ້ອງການຊື້.ສົ່ງຍອດໃຫ້ຈ່າຍກ່ອນຫນ້ານີ້,ທ່ານຕ້ອງຕື່ມຂໍ້ມູນໃນບ່ອນທີ່ຢູ່ຮັບສິນຄ້າ.ແລະຢືນຢັນຄ່າໃຊ້ຈ່າຍໃນການຂົນສົ່ງທີ່ກ່ຽວຂ້ອງກັບຕິດຕໍ່ບໍລິການລູກຄ້າອອນໄລຫຼັງຈາກຢືນຢັນເຮັດການຊໍາລະເງິນ ໂດຍບໍ່ໃຊ້ເວລາເພື່ອເຮັດການຊໍາລະເງິນ.
				</p>
				<img src="../../../img/helpCenter/buy_bg_tu (6).png" alt="" />
				<img src="../../../img/helpCenter/buy_bg_tu (1).png" alt="" />
			</div>
			<div>
				<p>4、ລໍຖ້າການຈັດສົ່ງຂອງເວັບໄຊ້.ແລະຢືນຢັນການໄດ້ຮັບ(ຫຼັງຈາກການຈັດສົ່ງ ຊື່ຜູ້ໃຊ້ສາມາດເບິ່ງຂໍ້ມູນຕິດຕາມການຂົນສົ່ງໃນ "ຄໍາສັ່ງຂອງຂ້ອຍ")</p>
				<img src="../../../img/helpCenter/buy_bg_tu (2).png" alt="" />
			</div>
		</div>

		<div class="help-content" v-if="$i18n.locale == 'my'">
			<div class="h-c-desc color-333">လုပ္ငန္းလည္ပတ္ျခင္းမ်ာ:
				<span>1、လုပ္ငန္းေဆာင္တာမ်ား</span>
				<span>2、အေကာင့္၀င္ျခင္း</span>
				<span>3、ကုန္သြယ္မွဳ</span>
				<span>4、ေရြးခ်ယ္ထားေသာကုန္စည္စုစုေပါင္း</span>
				<span>5、ကုန္စည္လက္ခံရရွိေသာ ျဖတ္ပိုင္းအတည္ျပဳျခင္း</span>
			</div>
			<div>
				<p>1、ခ်စ္ခင္ရပါေသာအသံုးျပဳသူသည္ကြ်န္ေတာ္တို ့ဧ။္ ၀က္ဆိုဒ္ ထဲကို၀င္ရန္ သင့္ထံတြင္အေကာင့္တစ္ခုရွိပါက ထိပ္ဆံုတြင္ရွိေသာ Navigation Bar ရွိ “၀င္မည္” ေပၚတြင္ ႏွိပ္ျပီး၀င္ပါ။ သင္ထံတြင္ အေကာင့္မရွိလွ်င္ “ မွတ္ပံုတင္မည္” ကိုေက်းဇူးျပဳရ်္ႏွိပ္ပါ။</p>
				<img src="../../../img/helpCenter/buy_bg_tu (3).png" alt="" />
				<img src="../../../img/helpCenter/login (4).png" alt="" />
			</div>
			<div>
				<p>2、သင္သည္ ကုန္စည္မ်ားတိုက္ရိုက္၀ယ္ယူရန္ အညႊန္း ကို Input ဧ။္ထိပ္တြင္ရွိေသာ Search Box သို ့မဟုတ္ Browser မွာ ေစ်းကြက္ ထုတ္ကုန္ သတင္းအခ်က္လက္မ်ားကိုရွာေဖြပါ။ သင့္အျကိုက္ဆံုး ထုတ္ကုန္ကိုေရြးခ်ယ္ပါ ထုတ္ကုန္ုန္ဧ။္အေသးစိပ္ စာမ်က္ႏွာသို ့ ႏွိပ္ရ်္ သင့္ေလ်ာ္ေသာ ထုတ္ကုန္ ကို ေရြးခ်ယ္ရ်္ ေစ်း၀ယ္လွည္းသို ့ထည့္ပါ။ အျခားကုန္စည္မ်ားအား၀ယ္ယူရန္ ပိုမိုေရြးခ်ယ္ဖို ့အျခားစာမ်က္ႏွာမ်ားတြင္သြားေရာက္ျကည့္ရွဳပါ။အဓိကတင္သြင္းဖို ့၀ယ္ယူရန္ကုန္စည္ မ်ားကိုကိုေရြးခ်ယ္ထားသည့္ အတည္ျပဳလွည္း</p>
				<img src="../../../img/helpCenter/buy_bg_tu (5).png" alt="" />
			</div>
			<div>
				<p>3、ထိုသို ့အတည္ျပဳျခင္းမတိုင္မီ ျပီးစီးခဲ့သည့္ ကုန္စည္၀ယ္ယူမွဳကို (ကြ်ႏ္ုပ္ဧ။္လွည္း)စာမ်က္ႏွာသို ့၀င္ရ်္ကုန္စည္တန္ဖိုးစုစုေပါင္းကို၀င္ေရာက္ျကည့္ရွဳႏိုင္သည္။ထိုသို ့မျပဳလုပ္မွီ ကုန္စည္လက္ခံမည့္လိပ္စာျဖည့္စြတ္ေပးရန္ ႏွင့္ ကုန္စည္သယ္ေဆာင္ခ က်သင့္ေငြတာ၀န္ခ့ ထံသို ့စံုစမ္းႏိုင္ပါသည္။ထိုသို ့ျပဳလုပ္ျပီးပါက ေငြလွည္းရန္ အသင့္ျဖစ္ပါသည္။</p>
				<img src="../../../img/helpCenter/buy_bg_tu (6).png" alt="" />
				<img src="../../../img/helpCenter/buy_bg_tu (1).png" alt="" />
			</div>
			<div>
				<p>4、ကုန္စည္လက္ခံျဖတ္ပိုင္းကို အတည္ျပဳေပးရန္ေစာင့္ဆိုင္းပါ။ သတင္းအခ်က္အလက္စာမ်က္ႏွာတြင္ သံုးစြဲသူမ်ားအတြက္ “က်ြႏ္ုပ္ကုန္္စည္”ေနရာတြင္ ကုန္စည္ေရာက္ရွိေနေသာ ေနရာကို၀င္ေရာက္စံုစမ္းႏိုင္သည္။ Tpimkp မွ</p>
				<img src="../../../img/helpCenter/buy_bg_tu (2).png" alt="" />
			</div>
		</div>

	</div>
</template>
<script>
</script>
<style lang='scss' scoped>
.h-c-desc {
	span {
		margin-right: 30px;
	}
}
</style>
