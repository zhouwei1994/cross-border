<template>
	<div>
		<div class="h-r-title">{{$t('buyingGuide.userLoginAndForgottenPassword')}}</div>
		<div class="help-content" v-if="$i18n.locale == 'zh_CN'">
			<div>
				<p>1、亲爱的用户，首先您需要进入tpimkp.com商城，请点击顶部导航栏右上方“登录”。</p>
				<img src="../../../img/helpCenter/login (3).png" alt="" />
			</div>
			<div>
				<p>2、输入你的邮箱号及密码，点击“登录“。登录成功后自动跳回到首页。</p>
				<img src="../../../img/helpCenter/login (4).png" alt="" />
			</div>
			<div>
				<p>3、如果您忘记了密码,请单击登录页面的“忘记密码”入口，进入【找回密码】页面。邮箱为您的注册邮箱，点击“获取验证码”，随后请前往您的邮箱获取验证码，并填写新密码，确认密码。点击“完成”，密码修改成功后，页面自动跳转到首页。</p>
				<img src="../../../img/helpCenter/login (5).png" alt="" />
			</div>
			<div>
				<p>4、如果您想修改当前密码，登录后可在“个人中心”里面，点击“修改密码”进入【修改密码】页面。同上操作流程。</p>
				<img src="../../../img/helpCenter/login (1).png" alt="" />
			</div>
		</div>

		<div class="help-content" v-if="$i18n.locale == 'en'">
			<div>
				<p>1、Dear users, first of all you need to enter the tpimkp.com mall, please click on the top navigation bar at the top right "login".</p>
				<img src="../../../img/helpCenter/login (3).png" alt="" />
			</div>
			<div>
				<p>2、Enter your email number and password, click "Login". Login automatically after the successful return to the home page.</p>
				<img src="../../../img/helpCenter/login (4).png" alt="" />
			</div>
			<div>
				<p>3、If you have forgotten your password, please click the "Forgot Password" entry on the login page to enter the [Retrieve Password] page. Mail for your registration email, click "Get Verification Code", then please go to your mailbox to obtain a verification code, and fill out the new password to confirm the password. Click "Finish", the password changes successfully, the page automatically jump to the home page.</p>
				<img src="../../../img/helpCenter/login (5).png" alt="" />
			</div>
			<div>
				<p>4、If you want to modify the current password, log in after the "personal center" inside, click "modify password" to enter 【modify password】 page. The same operation process.</p>
				<img src="../../../img/helpCenter/login (1).png" alt="" />
			</div>
		</div>

		<div class="help-content" v-if="$i18n.locale == 'th'">
			<div>
				<p>1、เรียนผู้ใช้ อันดับแรกคุณต้องทำการเข้าสู่ระบบ กรุณาคลิกที่แถบการนำทางด้านบนที่ด้านบนขวา "login"</p>
				<img src="../../../img/helpCenter/login (3).png" alt="" />
			</div>
			<div>
				<p>2、ใส่อีเมลและรหัสผ่าน แล้วคลิก Login หลังจาก Login แล้ว ระบบจากพาไปหน้าแรกอัตโนมัติ。</p>
				<img src="../../../img/helpCenter/login (4).png" alt="" />
			</div>
			<div>
				<p>3、ถ้าคุณลืมรหัสผ่าน กรุณาคลิกที่หน้าเข้าสู่ระบบ "ลืมรหัสผ่าน" เข้าสู่หน้า [เปลี่ยนรหัสผ่าน] อีเมลสำหรับการลงทะเบียนของคุณ คลิก "ส่งรหัสยืนยัน" เมื่อหน้า "Sent" โปรดไปที่อีเมลของคุณรับรหัสยืนยัน และกรอกรหัสผ่านใหม่ เพื่อยืนยันรหัสผ่านคลิก "เสร็จสิ้น" รหัสผ่านแก้ไขสำเร็จ หน้าเว็บจะกลับไปหน้าแรกโดยอัตโนมั</p>
				<img src="../../../img/helpCenter/login (5).png" alt="" />
			</div>
			<div>
				<p>4、ถ้าคุณต้องการเปลี่ยนรหัสผ่านปัจจุบัน หลังจากเข้าสู่ระบบสามารถเข้าไปที่หน้า"ศูนย์กลางส่วนบุคคล" คลิก "เปลี่ยนรหัสผ่าน" คลิกเข้าสู่หน้า【แก้ไขรหัสผ่าน】 กระบวนการดำเนินการเดียวกัน。</p>
				<img src="../../../img/helpCenter/login (1).png" alt="" />
			</div>
		</div>

		<div class="help-content" v-if="$i18n.locale == 'lo'">
			<div>
				<p>1、ຮຽນຜູ້ໃຊ້ອັນດັບທໍາອິດຄຸນຕ້ອງເຮັດການເຂົ້າສູ່ລະບົບກະລຸນາຄິກທີ່ແຖບການນໍາທາງດ້ານເທິງທີ່ດ້ານເທິງຂວາ "ເຂົ້າສູ່ລະບົບ"</p>
				<img src="../../../img/helpCenter/login (3).png" alt="" />
			</div>
			<div>
				<p>2、ໃສ່ອີເມວແລະລະຫັດຜ່ານແລ້ວຄິກເຂົ້າສູ່ລະບົບ.ຫລັງຈາກເຂົ້າສູ່ລະບົບແລ້ວລະບົບຈະພາໄປຫນ້າທໍາອິດອັດຕາໂນມັດ.</p>
				<img src="../../../img/helpCenter/login (4).png" alt="" />
			</div>
			<div>
				<p>3、ຖ້າທ່ານລືມລະຫັດຜ່ານ.ກະລຸນາຄິກທີ່ຫນ້າເຂົ້າສູ່ລະບົບ"ລືມລະຫັດຜ່ານ"ເຂົ້າສູ່ຫນ້າ[ປ່ຽນລະຫັດຜ່ານ].ອີເມວສໍາຫລັບການລົງທະບຽນຂອງທ່ານຄິກ"ສົ່ງລະຫັດ ຢືນຢັນ"ເມື່ອຫນ້າ"ສົ່ງໄປແລ້ວ"ໂປດໄປທີ່ອີເມວຂອງທ່ານຮັບລະຫັດຢືນຢັນແລະ ກອກລະຫັດຜ່ານໃຫມ່ເພື່ອຢືນຢັນລະຫັດຜ່ານຄິກ"ສົມບູນ"ລະຫັດຜ່ານແກ້ໄຂສໍາ ເລັດຫນ້າເວັບຈະກັບໄປຫນ້າທໍາອິດໂດຍອັດຕາໂນມັດ.
				</p>
				<img src="../../../img/helpCenter/login (5).png" alt="" />
			</div>
			<div>
				<p>4、ຖ້າທ່ານຕ້ອງການປ່ຽນລະຫັດຜ່ານປັດຈຸບັນ.ຫລັງຈາກເຂົ້າສູ່ລະບົບສາມາດເຂົ້າໄປທີ່ຫນ້າ"ສູນສ່ວນບຸກຄົນ"ຄິກ"ປ່ຽນລະຫັດຜ່ານ"ຄິກເຂົ້າສູ່ຫນ້າແກ້ໄຂລະຫັດຜ່ານຂະບວນການດໍາເນີນການດຽວກັນ</p>
				<img src="../../../img/helpCenter/login (1).png" alt="" />
			</div>
		</div>

		<div class="help-content" v-if="$i18n.locale == 'my'">
			<div>
				<p>1、ခ်စ္ခင္ရပါေသာ အသံုးျပဳသူ သင္ပထမလိုအပ္သည္မွာ Com Mall ထိပ္ Navigation Bar ရဲထပ္ပိုင္းညာဖပ္မွ ႏွိပ္ျပီး ၀င္ပါ။</p>
				<img src="../../../img/helpCenter/login (3).png" alt="" />
			</div>
			<div>
				<p>2、သင့္အေကာင့္နာမည္ ႏွင့္ စကား၀ွက္ကို ရိုက္ထည့္ရ်္၀င္ပါ။အေကာင့္သို ့၀င္ေရာက္ျခင္းေအာင္ျမင္ျပီး မူလစမ်က္ႏွာမွ တျခားစာမ်က္ႏွာသို ့သြားေရာက္ႏိုင္သည္။</p>
				<img src="../../../img/helpCenter/login (4).png" alt="" />
			</div>
			<div>
				<p>3、သင့္စကား၀ွက္ကို ေမ့ေလ်ာ့ေနလွ်င္ယ အေကာင့္ထဲသို ့၀င္ရန္စာမ်က္ႏွာကို ႏွိပ္ပါ စကား၀ွက္ေမ့လွ်င္ ဆိုေသာေနရာအားႏွိပ္ပါ။ အီးေမးလ္ ကို သင္အေကာင့္၀င္ထားေသာအီးေမးလ္ လိပ္စာျဖင့္ ကုဒ္နံပါတ္ ရယူရန္ဆိုေသာ စာလံုးကိုႏွိပ္ပါ။ထို ့ေနာက္ ကုဒ္ကိုအတည္ျပဳရန္ စာတိုက္ပံုးမွ သြားျပီး စကား၀ွက္အသစ္အတြက္ျဖည့္ပါ၊ စကား၀ွက္ကို အတည္ျပဳပါ။ စကား၀ွက္ေျပာင္းလဲမွဳေအာင္ျမင္ျပီးေနာက္ မူလစာမ်က္ႏွာကိုေရာက္ရ်္ ျပီးဆံုးေျကာင္းကိုႏိွပ္ပါ။</p>
				<img src="../../../img/helpCenter/login (5).png" alt="" />
			</div>
			<div>
				<p>4、သင့္ လက္ရွိစကား၀ွက္ကို ေျပာင္းလဲျပီး္ သင့္ကိုယ္ပိုင္စာမ်က္ႏွာ ကို၀င္ရ်္ (ေျပာင္းလဲထားေသာ စကား၀ွက္ကိို) မူလစာမ်က္ႏွာ တြင္ အေကာင့္၀င္ရန္ စကား၀ွက္အသစ္ကိုရိုက္ထည့္ပါ။</p>
				<img src="../../../img/helpCenter/login (1).png" alt="" />
			</div>
		</div>
	</div>
</template>
<script>
</script>
<style>

</style>
