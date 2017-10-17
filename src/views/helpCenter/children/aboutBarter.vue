<template>
  <div>
    <div class="h-r-title">{{$t('buyingGuide.aboutReplacement')}}</div>
    <div class="help-content" v-if="$i18n.locale == 'zh_CN'">
      <p class="color-333">亲爱的用户，您好，如商品存在任何问题，您可以联系客服处理，我们将会根据具体的情况给出相应的处理。</p>
      <div>
        <p>1、如商品未付款，您可以在“我的订单”中将处于“待确认”或“待付款”状态的订单点击“取消订单”，重新选择商品下单。</p>
      </div>
      <div>
        <p>2、如商品已付款，订单不能取消。</p>
        <img src="../../../img/helpCenter/cancel_order_bg_tu (3).png" alt="" />
      </div>
    </div>

    <div class="help-content" v-if="$i18n.locale == 'en'">
      <p class="color-333">Dear user, hello, if there is any problem with the goods, you can contact customer service, we will be given according to the specific circumstances of the corresponding treatment.</p>
      <div>
        <p>1、If the goods are not paid, you can click "Cancel Order" in the "Pending" or "Pending" status order in "My Order" to re-select the order.</p>
      </div>
      <div>
        <p>2、If the goods have been paid, the order can not be canceled.</p>
        <img src="../../../img/helpCenter/cancel_order_bg_tu (3).png" alt="" />
      </div>
    </div>

    <div class="help-content" v-if="$i18n.locale == 'th'">
      <p class="color-333">เรียนผู้ใช้ สวัสดีค่ะ หากมีสินค้ามีปัญหาใดๆ คุณสามารถติดต่อฝ่ายบริการลูกค้าเราทำการจัดการให้ได้ เราจะทำการจัดการตามสถานการณ์การที่เกี่ยวข้องให้สอดคล้องกัน</p>
      <div>
        <p>1、หากสินค้ายังไม่ได้ชำระเงิน คุณสามารถเข้าไปที่ "ใบสั่งซื้อของฉัน" ซึ่งใบสั่งซื้อจะแสดงสถานะ "รอการยืนยัน" หรือ "รอการชำระเงิน" คลิก "ยกเลิกใบสั่งซื้อ" แล้วสั่งซื้อสินค้าอีกครั้ง。</p>
      </div>
      <div>
        <p>2、หากสินค้าชำระเงินแล้ว ใบสั่งซื้อจะไม่สามารถยกเลิกได้。</p>
        <img src="../../../img/helpCenter/cancel_order_bg_tu (3).png" alt="" />
      </div>
    </div>

    <div class="help-content" v-if="$i18n.locale == 'lo'">
      <p class="color-333">ຜູ້ໃຊ້ທີ່ຮັກແພງ,ຖ້າທ່ານມີບັນຫາໃດໆ.ທ່ານສາມາດຕິດຕໍ່ບໍລິການລູກຄ້າ. ພວກເຮົາຈະຈັດການກັບສະຖານະການດັ່ງກ່າວ.</p>
      <div>
        <p>1、ຖ້າສິນຄ້າບໍ່ໄດ້ຈ່າຍເງິນ.ທ່ານສາມາດໄປຫາ"ຄໍາສັ່ງຂອງຂ້ອຍ" ທີ່ຄໍາສັ່ງສະແດງໃຫ້ເຫັນສະຖານະພາບ."ລໍຖ້າການຢັ້ງຢືນ"ຫຼື"ລໍຖ້າການຈ່າຍເງິນ"ໃຫ້ຄລິກໃສ່"ຍົກເລີກຄໍາສັ່ງຊື້"ແລະຫຼັງຈາກນັ້ນໃຫ້ຄໍາສັ່ງອີກເທື່ອຫນຶ່ງ.</p>
      </div>
      <div>
        <p>2、ຖ້າສິນຄ້າຈ່າຍເງິນຮຽບຮ້ອຍແລ້ວ. ຄໍາສັ່ງບໍ່ສາມາດຍົກເລີກໄດ້. ຄິດລາຄາຕາມປະລິມານສິນຄ້າ
        </p>
        <img src="../../../img/helpCenter/cancel_order_bg_tu (3).png" alt="" />
      </div>
    </div>

    <div class="help-content" v-if="$i18n.locale == 'my'">
      <p class="color-333">ကြ်ႏ္ုပ္တို ့ဘက္မွ အေျခအေနေပၚမူတည္ျပီးအေကာင္းဆံုးေသာေသာ၀န္ေဆာင္မွုျပဳလုပ္ေပးပါမည္။</p>
      <div>
        <p>1、အကယ္ရ်္ ကုန္စည္ေငြေပးေခ်မွဳမရွိေသးပါက ယခု၀ယ္ယူထားေသာကုန္စည္ အားပယ္ဖ်က္ျပီး ေနာက္ကုန္စည္တစ္မ်ိဳးအားျပန္လည္ေရြးခ်ယ္၀ယ္ယူႏိုင္ပါသည္။</p>
      </div>
      <div>
        <p>2、သို ့ေသာ္ကုန္စည္အတြက္ေငြေပးေဆာင္ထားျပီးပါကအတည္ျပဳခ်က္ကိုျဖတ္သိမ္းရမည္မဟုတ္ပါ။ </p>
        <img src="../../../img/helpCenter/cancel_order_bg_tu (3).png" alt="" />
      </div>
    </div>

  </div>
</template>
<script>
</script>
<style>

</style>
