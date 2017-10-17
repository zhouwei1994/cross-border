<template>
  <div>
    <div class="h-r-title">{{$t('buyingGuide.orderAndCommodityLogisticsTracking')}}</div>
    <div class="help-content" v-if="$i18n.locale == 'zh_CN'">
      <div>
        <p>1、亲爱的用户，首先您需要登录tpimkp.com商城。</p>
        <img src="../../../img/helpCenter/login (4).png" alt="" />
      </div>
      <div>
        <p>2、进入首页后，点击首页中顶部导航右上角“我的订单”。</p>
        <img src="../../../img/helpCenter/order_bg_tu (3).png" alt="" />
      </div>
      <div>
        <p>3、查看历史订单，当订单为“已发货”状态时，可点击操作中的“查看物流”跳至物流信息页面，查看当前物流进度。</p>
        <img src="../../../img/helpCenter/order_bg_tu (4).png" alt="" />
        <img src="../../../img/helpCenter/logistics_bg_tu (3).png" alt="" />
      </div>
    </div>

    <div class="help-content" v-if="$i18n.locale == 'en'">
      <div>
        <p>1、Dear users, first you need to log in tpimkp.com mall.</p>
        <img src="../../../img/helpCenter/login (4).png" alt="" />
      </div>
      <div>
        <p>2、After entering the home page, click on the top of the page in the top right corner of the "My Order".</p>
        <img src="../../../img/helpCenter/order_bg_tu (3).png" alt="" />
      </div>
      <div>
        <p>3、View the history order, when the order is "shipped" status, you can click on the operation of the "view logistics" jump to the logistics information page, view the current logistics progress.</p>
        <img src="../../../img/helpCenter/order_bg_tu (4).png" alt="" />
        <img src="../../../img/helpCenter/logistics_bg_tu (3).png" alt="" />
      </div>
    </div>

    <div class="help-content" v-if="$i18n.locale == 'th'">
      <div>
        <p>1、เรียนผู้ใช้ อันดับแรกคุณต้องเข้าสู่ระบบเว็บไซต์ของเรา。</p>
        <img src="../../../img/helpCenter/login (4).png" alt="" />
      </div>
      <div>
        <p>2、หลังจากเข้าไปหน้าแรกแล้ว คลิกที่มุมขวาด้านบน "ใบสั่งซื้อของฉัน"。</p>
        <img src="../../../img/helpCenter/order_bg_tu (3).png" alt="" />
      </div>
      <div>
        <p>3、ตรวจสอบประวัติใบสั่งซื้อ เมื่อใบสั่งซื้อมีสถานะเป็น "จัดส่งแล้ว" สามารถคลิกดำเนินการ "ตรวจสอบการขนส่ง" ระบบจะพาไปที่ข้อมูลการขนส่งหน้าแรก ตรวจสอบความคืบหน้าการขนส่งปัจจุบัน 。
        </p>
        <img src="../../../img/helpCenter/order_bg_tu (4).png" alt="" />
        <img src="../../../img/helpCenter/logistics_bg_tu (3).png" alt="" />
      </div>
    </div>

    <div class="help-content" v-if="$i18n.locale == 'lo'">
      <div>
        <p>1、ຊື່ຜູ້ໃຊ້ທີ່ຮັກແພງ.ຫນ້າທໍາອິດຂອງທ່ານຕ້ອງເຂົ້າສູ່ເວັບໄຊຂອງພວກເຮົາ. </p>
        <img src="../../../img/helpCenter/login (4).png" alt="" />
      </div>
      <div>
        <p>2、ຫຼັງຈາກຫນ້າທໍາອິດ. ກົດຢູ່ແຈຂວາເທິງສຸດ. "ຄໍາສັ່ງຂອງຂ້ອຍ"</p>
        <img src="../../../img/helpCenter/order_bg_tu (3).png" alt="" />
      </div>
      <div>
        <p>3、ກວດເບິ່ງປະຫວັດການສັ່ງຊື້ເມື່ອ"ຄໍາສັ່ງໄດ້ຖືກສົ່ງ"ສະຖານະ,ສາມາດຄລິກໃສ່ການປະຕິບັດ."ກວດເບິ່ງການຂົນສົ່ງ",ລະບົບຈະນໍາທ່ານໄປຫນ້າຂໍ້ມູນການຂົນ ສົ່ງ.ກວດເບິ່ງຄວາມຄືບຫນ້າການຂົນສົ່ງໃນປະຈຸບັນ.
        </p>
        <img src="../../../img/helpCenter/order_bg_tu (4).png" alt="" />
        <img src="../../../img/helpCenter/logistics_bg_tu (3).png" alt="" />
      </div>
    </div>

    <div class="help-content" v-if="$i18n.locale == 'my'">
      <div>
        <p>1、ခ်စ္ခင္ရေသာအသံုးျပဳသူ သင္သည္ပထမဆံုး Companyေမးလ္ ကိုပထမဆံုးလိုအပ္ပါသည္။</p>
        <img src="../../../img/helpCenter/login (4).png" alt="" />
      </div>
      <div>
        <p>2、ပင္မစာမ်က္ႏွာကိုသြားရ်္  ပင္မစာမ်က္ႏွာမွ အညႊန္းစာမ်က္နာဧ။္ ထိပ္ပိုင္းေထာင့္အေပၚနားမွ “ကြ်န္ုပ္ လုပ္ေဆာင္ခ်က္” ေနရာတြင္ႏွိပ္ပါ။</p>
        <img src="../../../img/helpCenter/order_bg_tu (3).png" alt="" />
      </div>
      <div>
        <p>3、လုပ္ေဆာင္ျပီးသြားေသာ အေျကာင္းအရာမ်ား ၊ လုပ္ေဆာင္ေနေသာ အေျကာင္းအရာမ်ား ႏွင့္ ေထာက္ပံ့ပို ့ေဆာင္ေရးကိုျကည့္ရွဳႏိုင္သည္။ေထာက္ပံ့ပို ့ေဆာင္ေရးအခ်က္အလက္စာမ်က္ႏွာကို ေက်ာ္ရ်္ “ျပည္နယ္ တင္ပို ့” မွဳကို ႏိွပ္ရ်္ ေထာက္ပံ့ပို ့ေဆာင္ေရးဧ။္ လက္ရွိအေျခအေနကိုသိရွိႏိုင္ပါသည္။</p>
        <img src="../../../img/helpCenter/order_bg_tu (4).png" alt="" />
        <img src="../../../img/helpCenter/logistics_bg_tu (3).png" alt="" />
      </div>
    </div>

  </div>
</template>
<script>
</script>
<style>

</style>
