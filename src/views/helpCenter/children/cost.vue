<template>
  <div>
    <div class="h-r-title">{{$t('confirmOrder.costEstimate')}}</div>
    <div class="help-content">
      <p class="h-c-title">{{$t('buyingGuide.calculationOfLogisticsCostOfCommodityTransportation')}}</p>
      <div class="ub calc-box">
        <div class="calculator">
          <div class="c-text-center ui-mb-10">{{$t('buyingGuide.estimatedThaiFreight')}}</div>
          <div class="desc-list">
            <div class="text-box">
              <div>{{$t('buyingGuide.productCategory')}}</div>
              <div>{{$t('buyingGuide.normalProduct')}}</div>
            </div>
            <div>
              <div>{{$t('buyingGuide.transport')}}</div>
              <div>
                <select class="select-box" v-model="transport">
                  <option value="0">{{$t('buyingGuide.landTransport')}}</option>
                  <option value="1">{{$t('buyingGuide.seaShipping')}}</option>
                </select>
              </div>
            </div>
            <div>
              <div>{{$t('buyingGuide.productWeight')}}</div>
              <div>
                <input class="weight" type="text" v-model="weight" />KG</div>
            </div>
          </div>
          <div class="c-text-center ui-mt-35 ui-mb-12">{{$t('buyingGuide.packagingVolume')}}</div>
          <div class="volume">
            <div>
              <div>{{$t('buyingGuide.long')}}(cm)</div>
              <div>
                <input type="text" v-model="long" />
              </div>
            </div>
            <div>
              <div>{{$t('buyingGuide.width')}}(cm)</div>
              <div>
                <input type="text" v-model="width" />
              </div>
            </div>
            <div>
              <div>{{$t('buyingGuide.high')}}(cm)</div>
              <div>
                <input type="text" v-model="height" />
              </div>
            </div>
          </div>
          <div class="result ub ub-pc">
            <div class="ub ub-ac">
              <span>=</span>
              <input type="text" v-model="volume" readonly="readonly" />
              <span>{{$t('buyingGuide.cubicMeter')}}</span>
            </div>
          </div>
          <div class="calc cu-po" @click="finalPrice">{{$t('buyingGuide.calculation')}}</div>
          <div class="total c-text-center">{{$t('buyingGuide.sumInTheThaiFreight')}}&nbsp;
            <span>{{collectFees}}</span>&nbsp;{{$t('buyingGuide.baht')}}</div>
          <div class="c-text-center ui-mb-6" v-if="calculationMethod == 0">{{$t('buyingGuide.inKilograms')}}</div>
          <div class="c-text-center ui-mb-6" v-else>{{$t('buyingGuide.calculatedInCubicMeters')}}</div>
          <div class="c-text-center" v-if="calculationMethod == 0">{{$t('buyingGuide.XXbahtPerUnit') | replace(60)}}</div>
          <div class="c-text-center" v-else>{{$t('buyingGuide.XXbahtPerUnit') | replace(8000)}}</div>
          <div class="c-remark">*{{$t('buyingGuide.calculatingFreightIsOnlyAnEstimate')}}</div>
        </div>
        <div class="" v-if="$i18n.locale == 'zh_CN'">
          <div class="ic-goods-volume"></div>
          <div class="rule-title">按物品体积计算</div>
          <div class="rule-desc">
            <p>适用于重量较轻的物品</p>
            <p>一个立方的重量低于350公斤算立方</p>
          </div>
          <div class="rule-bottom">体积计算方式</div>
          <div class="">长×宽×高</div>
        </div>

        <div class="" v-if="$i18n.locale == 'en'">
          <div class="ic-goods-volume"></div>
          <div class="rule-title">According to the volume of goods</div>
          <div class="rule-desc">
            <p>Suitable for lighter weight items</p>
            <p>A cubic weight of less than 350 kg</p>
          </div>
          <div class="rule-bottom">Volume calculation</div>
          <div class="">Long × wide × high</div>
        </div>

        <div class="" v-if="$i18n.locale == 'th'">
          <div class="ic-goods-volume"></div>
          <div class="rule-title">คิดราคาตามปริมาตรสินค้า</div>
          <div class="rule-desc">
            <p>เหมาะสำหรับสินค้าที่มีน้ำหนักค่อนข้างเบา</p>
            <p>สินค้า 1 คิว ต้องมีน้ำหนักไม่เกิน 350 kg</p>
          </div>
          <div class="rule-bottom">วิธีการคำนวณ</div>
          <div class="">กว้าง*ยาว*สูง</div>
        </div>

        <div class="" v-if="$i18n.locale == 'lo'">
          <div class="ic-goods-volume"></div>
          <div class="rule-title">ຄິດ ລາຄາໂດຍປະລິມານສິນຄ້າ</div>
          <div class="rule-desc">
            <p>ເຫມາະສໍາຫລັບສິນຄ້າທີ່ມີ ນ້ຳຫນັກຄ່ອນຂ້າງເບົາ</p>
            <p>ສິນຄ້າ 1 ຄິວຕ້ອງມີ ນ້ຳຫນັກບໍ່ເກີນ 350 kg</p>
          </div>
          <div class="rule-bottom">ທີການຄໍານວນ</div>
          <div class="">ກວ້າງ * ຍາວ * ສູງ</div>
        </div>

        <div class="" v-if="$i18n.locale == 'my'">
          <div class="ic-goods-volume"></div>
          <div class="rule-title">ကုန္စည္ေပၚမူတည္ရ်္ထုထည္ျဖင့္တြက္ခ်က္ျခင္း	</div>
          <div class="rule-desc">
            <p>ေပါ့ပါးေသာကုန္စည္မ်ားအား သင့္ေလ်ာ္ေသာ အတိုင္းအတာျဖင့္တြက္ခ်က္ေပးသည္။350ကီလိုဂရမ</p>
            <p>ေအာက္ တစ္ကုဗမီတာရွိေသာ   ကုန္စည္ကို ထုထည္ျဖင့္တြက္ခ်က္သည္။</p>
          </div>
          <div class="rule-bottom">ထုထည္တြက္ခ်က္ျခင္း</div>
          <div class="">အလ်ား × အနံ × အျမင့္</div>
        </div>



        <div class="" v-if="$i18n.locale == 'zh_CN'">
          <div class="ic-goods-weight"></div>
          <div class="rule-title">按物品重量计算</div>
          <div class="rule-desc">
            <p>适用于重量较重的物品</p>
            <p>一个立方的重量高于350公斤算重量</p>
          </div>
        </div>

        <div class="" v-if="$i18n.locale == 'en'">
          <div class="ic-goods-weight"></div>
          <div class="rule-title">According to the weight of the item</div>
          <div class="rule-desc">
            <p>Suitable for heavy weight items</p>
            <p>A cubic weight is higher than 350 kg</p>
          </div>
        </div>

        <div class="" v-if="$i18n.locale == 'th'">
          <div class="ic-goods-weight"></div>
          <div class="rule-title">คิดราคาตามน้ำหนักสินค้า</div>
          <div class="rule-desc">
            <p>เหมาะสำหรับสินค้าที่มีน้ำหนักมาก</p>
            <p>สินค้า 1 คิว ที่มีน้ำหนักเกิน 350 kg</p>
          </div>
        </div>

        <div class="" v-if="$i18n.locale == 'lo'">
          <div class="ic-goods-weight"></div>
          <div class="rule-title">ຄິດ ລາຄາໂດຍ ນ້ຳຫນັກ ສິນຄ້າ</div>
          <div class="rule-desc">
            <p>ເຫມາະສໍາຫລັບສິນຄ້າທີ່ມີ ນ້ຳຫນັກຫລາຍ</p>
            <p>ສິນຄ້າ 1 ຄິວທີ່ມີ ນ້ຳຫນັກເກີນ 350 kg</p>
          </div>
        </div>

        <div class="" v-if="$i18n.locale == 'my'">
          <div class="ic-goods-weight"></div>
          <div class="rule-title">ကုန္စည္မ်ားကိုအေလးခ်ိန္ျဖင့္တြက္ခ်က္ျခင္း	</div>
          <div class="rule-desc">
            <p>ေလးလံေသာကုန္စည္ 350 ကီလိုဂရမ္အထက္ရွိေသာ </p>
            <p>တစ္ကုဗမီတာရွိေသာ ကုန္စည္မ်ားကို ကီလိုဂရမ္ ႏွင့္တြက္ခ်က္ေပးသည္။</p>
          </div>
        </div>

      </div>
      <p class="h-c-title c-t-center" v-if="$i18n.locale == 'zh_CN'">备注</p>
      <p class="h-c-title c-t-center" v-if="$i18n.locale == 'en'">Remarks</p>
      <p class="h-c-title c-t-center" v-if="$i18n.locale == 'th'">คำพูด</p>
      <p class="h-c-title c-t-center" v-if="$i18n.locale == 'lo'">ຄໍາເວົ້າ </p>
      <p class="h-c-title c-t-center" v-if="$i18n.locale == 'my'">အခ်က္အလက္ </p>
      <div class="remark" v-if="$i18n.locale == 'zh_CN'">
        <div>
          <div class="r-item">
            <span class="ic-r-import"></span>
            <p>需要进口许可证的商品价格比普货价格高</p>
          </div>
          <div class="r-item">
            <span class="ic-r-compensation"></span>
            <p>物品丢失按运费的3倍赔偿</p>
          </div>
          <div class="r-item">
            <span class="ic-r-list"></span>
            <p>发货前要与负责人联系取得相应的代号和商品清单</p>
          </div>
        </div>
        <div>
          <div class="r-item">
            <span class="ic-r-weight"></span>
            <p>陆运物品单位重量超过350公斤或者海运物品单件重量超过1500公斤的情况要提前通知负责人</p>
          </div>
          <div class="r-item">
            <span class="ic-r-liquor"></span>
            <p>我公司不承运的物品有液体，食品，药品，名牌</p>
          </div>
          <div class="r-item">
            <span class="ic-r-free"></span>
            <p>超过300公斤或1个立方的物品可免费在曼谷市区内配送，若没有达到标准，则根据路程收取配送费</p>
          </div>
        </div>
      </div>

      <div class="remark" v-if="$i18n.locale == 'en'">
        <div>
          <div class="r-item">
            <span class="ic-r-import"></span>
            <p>Prices that require import licenses are higher than those for general merchandise</p>
          </div>
          <div class="r-item">
            <span class="ic-r-compensation"></span>
            <p>Items are lost by 3 times the cost of shipping</p>
          </div>
          <div class="r-item">
            <span class="ic-r-list"></span>
            <p>Before shipment, contact the responsible person to obtain the corresponding code and commodity list</p>
          </div>
        </div>
        <div>
          <div class="r-item">
            <span class="ic-r-weight"></span>
            <p>If the weight of the transhipment unit exceeds 350 kg or the weight of the maritime goods exceeds 1500 kg, the person in charge shall notify the person in advance</p>
          </div>
          <div class="r-item">
            <span class="ic-r-liquor"></span>
            <p>I do not transport the goods are liquid, food, medicine, brand name</p>
          </div>
          <div class="r-item">
            <span class="ic-r-free"></span>
            <p>More than 300 kilograms or 1 cubic meter of items can be distributed free of charge in the city of Bangkok, if not meet the standard, according to the distance to collect delivery fee</p>
          </div>
        </div>
      </div>

      <div class="remark" v-if="$i18n.locale == 'th'">
        <div>
          <div class="r-item">
            <span class="ic-r-import"></span>
            <p>สินค้าที่ราคาสูงกว่าสินค้าทั่วไปต้องมีใบอนุญาตนำเข้า</p>
          </div>
          <div class="r-item">
            <span class="ic-r-compensation"></span>
            <p>สินค้าที่สูญหายจะชดใช้ตามราคาค่าขนส่ง 3 เท่า</p>
          </div>
          <div class="r-item">
            <span class="ic-r-list"></span>
            <p>ก่อนส่งสินค้าต้องทำการติดต่อผู้รับผิดชอบเพื่อขอรับรหัสและรายการสินค้าที่เกี่ยวข้อง</p>
          </div>
        </div>
        <div>
          <div class="r-item">
            <span class="ic-r-weight"></span>
            <p>สินค้าส่งทางรถต่อ1หน่วยจำนวนน้ำหนักต้องไม่เกิน350KGหรือสินค้าที่ส่งทางเรือต่อ1หน่วยน้ำหนักต้องไม่เกิน1500KG ซึ่งต้องแจ้งกับผู้รับผิดชอบล่วงหน้า</p>
          </div>
          <div class="r-item">
            <span class="ic-r-liquor"></span>
            <p>เราไม่รับขนส่งสินค้าที่เป็นของเหลว อาหาร ผลิตภัณฑ์ยา สินค้าลิขสิทธิ์</p>
          </div>
          <div class="r-item">
            <span class="ic-r-free"></span>
            <p>สินค้าที่มีน้ำหนักเกิน300KGหรือเกิน 1 คิว หากอยุ่ในเขตกรุงเทพเราจะจัดส่งให้ฟรี แต่หากไม่ถึงตามเกณฑ์ที่กำหนด จะคิดค่าจัดส่งตามระยะทาง</p>
          </div>
        </div>
      </div>

      <div class="remark" v-if="$i18n.locale == 'lo'">
        <div>
          <div class="r-item">
            <span class="ic-r-import"></span>
            <p>ສິນຄ້າທີ່ລາຄາສູງກວ່າສິນຄ້າທົ່ວໄປຕ້ອງມີໃບອະນຸຍາດນໍາເຂົ້າ.</p>
          </div>
          <div class="r-item">
            <span class="ic-r-compensation"></span>
            <p>ສິນຄ້າທີ່ຫາຍຈະໄດ້ຮັບສິນທົດແທນອີງຕາມການຄ່າຂົນສົ່ງ3 ຄັ້ງ.</p>
          </div>
          <div class="r-item">
            <span class="ic-r-list"></span>
            <p>ກ່ອນການຂົນສົ່ງ,ຕິດຕໍ່ຜູ້ທີ່ຮັບຜິດຊອບສໍາລັບລະຫັດທີ່ກ່ຽວຂ້ອງແລະລາຍການຜະລິດຕະພັນ.</p>
          </div>
        </div>
        <div>
          <div class="r-item">
            <span class="ic-r-weight"></span>
            <p>ການຂົນສົ່ງທາງບົກສິນຄ້າຕໍ່1ຫນ່ວຍນ້ຳຫນັກເກີນ350ກິໂລຫຼືການຂົນສົ່ງທາງທະເລສິນຄ້າສົ່ງຕໍ່1ໂຕນ ນ້ຳຫນັກເກີນ1500KG.ນີ້ຕ້ອງໄດ້ຮັບແຈ້ງໃຫ້ຜູ້ຮັບຜິດ
ຊອບລ່ວງຫນ້າ.
</p>
          </div>
          <div class="r-item">
            <span class="ic-r-liquor"></span>
            <p>ພວກເຮົາບໍ່ຍອມຮັບສິນຄ້າທີ່ມີທາດແຫລວ.ອາຫານ,ຜະລິດຕະພັນຢາ,ຜະລິດ
ຕະພັນລິຂະສິດ.
</p>
          </div>
          <div class="r-item">
            <span class="ic-r-free"></span>
            <p>ຜະລິດຕະພັນທີ່ມີຫຼາຍກວ່າ300KGຫຼືຫຼາຍກ່ວາ1ຄິວ.ຖ້າຢູ່ໃນກຸງເທບ,ພວກເຮົາຈະສົ່ງໄປຮອດ.ແຕ່ຖ້າມັນບໍ່ຕອບສະຫນອງເງື່ອນໄຂ.ຈະຄິດຄ່າຈັດສົ່ງຕາມລະຍະທາງ</p>
          </div>
        </div>
      </div>

      <div class="remark" v-if="$i18n.locale == 'my'">
        <div>
          <div class="r-item">
            <span class="ic-r-import"></span>
            <p>သွင်းကုန်လိုင်စင်ယေဘုယျကုန်တင်၏စျေးနှုန်းထက်ကုန်စည်ဈေးနှုန်းများပိုမိုမြင့်မားလိုအပ်ပါသည်</p>
          </div>
          <div class="r-item">
            <span class="ic-r-compensation"></span>
            <p>လျော်ကြေး 3 ကြိမ်ကုန်တင်အားဖြင့်ဆုံးရှုံးခဲ့ရ items</p>
          </div>
          <div class="r-item">
            <span class="ic-r-list"></span>
            <p>တင်ပို့မတိုင်မီဆက်သွယ်တာဝန်ခံအတွက်သင့်လျော်သောကုဒ်နှင့်ကုန်ပစ္စည်းနှင့်လူများစာရင်းကိုရရှိရန်</p>
          </div>
        </div>
        <div>
          <div class="r-item">
            <span class="ic-r-weight"></span>
            <p>350 ကျော်ကီလိုဂရမ်သို့မဟုတ်ရေကြောင်းကုန်စည်ပြည်သယ်ယူပို့ဆောင်ရေးကုန်ပစ္စည်းယူနစ်အလေးချိန်ကြိုတင်မဲအတွက်တာဝန်ခံအတွက်လူတစ်ဦးကိုအကြောင်းကြားဖို့ထက်ပိုမို 1500 ကီလိုဂရမ်တစ်ခုတည်းအလေးချိန်၏ဖြစ်ရပ်မှန်</p>
          </div>
          <div class="r-item">
            <span class="ic-r-liquor"></span>
            <p>ငါအရည်ပစ္စည်းများ, အစားအစာ, ဆေးဝါး, အမှတ်တံဆိပ်အမည်ဖြင့်သယ်ဆောင်ကြဘူး</p>
          </div>
          <div class="r-item">
            <span class="ic-r-free"></span>
            <p>300 ကျော်ကီလိုဂရမ်သို့မဟုတ်ဘန်ကောက်၏မြို့ပြဧရိယာထဲမှာအခမဲ့ဖြန့်ဖြူးဘို့တကုဗပစ္စည်းများ, မတန်းတူအထိ, ထို့နောက်အကွာအဝေးတင်ပို့ခြင်းနှင့်အညီတရားစွဲဆိုခံရလျှင်</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      width: '',
      height: '',
      long: '',
      weight: '',
      volume: '',
      transport: 0,//运输方式
      calculationMethod: 0,//计算方式
      collectFees: 0
    }
  },
  watch: {
    width(val) {
      this.calculation();
    },
    height(val) {
      this.calculation();
    },
    long(val) {
      this.calculation();
    },
    weight(val) {
      if (/[0-9.]/.test(val)) {
        this.weight = val;
      } else {
        this.weight = '';
      }
    }
  },
  methods: {
    calculation() {
      const width = this.width;
      const height = this.height;
      const long = this.long;
      const weight = this.weight;
      if (/[0-9.]/.test(width)) {
        this.width = width;
      } else {
        this.width = '';
      }
      if (/[0-9.]/.test(height)) {
        this.height = height;
      } else {
        this.height = '';
      }
      if (/[0-9.]/.test(long)) {
        this.long = long;
      } else {
        this.long = '';
      }
      if (width && height && long) {
        this.volume = parseFloat((parseFloat(width * height * long) / 1000000).toFixed(6));
      } else {
        this.volume = '';
      }
    },
    finalPrice() {
      let normalProportion = '';
      if (!this.weight) {
        this.$parent.$parent.$refs.confirm.tip(this.$t('请输入物品的重量'), false);
      } else if (!this.volume) {
        this.$parent.$parent.$refs.confirm.tip(this.$t('请输入物品的长宽高'), false);
      } else {
        const weight = parseFloat(this.weight);
        const volume = parseFloat(this.volume);
        if (this.transport == 0) {
          normalProportion = 200 * volume;
        } else {
          normalProportion = 350 * volume;
        }
        if (weight >= normalProportion) {
          this.calculationMethod = 0;
          this.collectFees = weight * 60;
        } else {
          this.calculationMethod = 1;
          this.collectFees = volume * 8000;
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../style/components/main';
.h-c-title {
  font-size: 22px;
  color: $main-color;
  margin: 4px 0 21px;
  &.c-t-center {
    text-align: center;
    margin: 64px 0 26px;
  }
}

.input-border {
  border: 2px solid #e6e6e6;
}

.f-norm-14 {
  height: 14px;
  line-height: 1;
}

.calc-box {
  &>div {
    font-size: 14px;
    padding-top: 20px;
    padding-bottom: 20px;
    -webkit-box-flex: 1;
    &:not(.calculator) {
      line-height: 24px;
      .rule-title {
        @extend .f-norm-14;
        font-weight: bold;
        margin: 40px 0 15px;
      }
      .rule-desc {}
      .rule-bottom {
        margin-top: 96px;
        font-weight: bold;
      }
    }
    &:nth-child(2) {
      width: 362px;
      padding-left: 108px;
    }
    &:nth-child(3) {
      width: 244px;
      padding-left: 22px;
    }
  }
}

.calculator {
  border: 1px solid #ffa766;
  width: 304px;
  line-height: normal;
  .c-text-center {
    @extend .f-norm-14;
    text-align: center;
  }
  .desc-list {
    padding-left: 26px;
    &>div {
      height: 54px;
      display: -webkit-box;
      display: -moz-box;
      -webkit-box-align: center;
      &>div:first-child {
        width: 128px;
      }
      .weight {
        @extend .input-border;
        width: 42px;
        height: 36px;
        line-height: 32px;
        text-align: center;
        margin-right: 12px;
      }
    }
    .text-box {
      height: 42px;
    }
  }
  .volume {
    @include clear;
    padding: 0px 26px;
    &>div {
      float: left;
      &>div {
        &:first-child {
          height: 38px;
          line-height: 38px;
          text-align: center;
        }
        &:nth-child(2) {
          input {
            width: 65px;
            height: 36px;
            text-align: center;
            @extend .input-border;
            display: block;
            float: left;
          }
        }
      }
      &:not(:last-child) {
        &>div {
          &:nth-child(2) {
            &::after {
              content: 'x';
              display: block;
              height: 36px;
              line-height: 36px;
              float: left;
              text-align: center;
              width: 20px;
            }
          }
        }
      }
    }
  }
  .result {
    margin-top: 13px;
    input {
      width: 98px;
      height: 36px;
      display: block;
      margin: 0 20px;
      text-align: center;
      border: 2px solid $main-color;
    }
  }
  .calc {
    margin: 20px auto 0;
    width: 90px;
    height: 36px;
    line-height: 36px;
    font-size: 16px;
    text-align: center;
    color: #fff;
    background-color: $main-color;
  }
  .total {
    font-size: 16px;
    height: 16px;
    line-height: 1;
    font-weight: bold;
    margin: 12px auto 20px;
  }
  .c-remark {
    width: 246px;
    margin: 15px auto 0;
    line-height: 22px;
    font-size: 12px;
    color: #ff1c1c;
  }
}

.remark {
  @include clear;
  &>div {
    display: -webkit-box;
    display: -moz-box;
    float: left;
    min-height: 120px;
    padding: 10px 0;
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
}


.select-box {
  @extend .input-border;
  height: 36px;
  line-height: 32px;
  width: 82px;
  text-align: center;
  padding-right: 17px;
  border: 2px solid #e6e6e6;
  padding: 0px 10px;
}

.ic-goods {
  @include bindicBg(169px, 155px);
}

.ic-goods-volume {
  @extend .ic-goods;
  background-image: url(../../../img/helpCenter/cost_bg_tu-1.png);
}

.ic-goods-weight {
  @extend .ic-goods;
  background-image: url(../../../img/helpCenter/cost_bg_tu-2.png);
}

.ic-remark {
  @include bindicBg(70px, 70px);
}

.ic-r-import {
  @extend .ic-remark;
  background-image: url(../../../img/helpCenter/cost_bg_tu-3.png);
}

.ic-r-compensation {
  @extend .ic-remark;
  background-image: url(../../../img/helpCenter/cost_bg_tu-4.png);
}

.ic-r-list {
  @extend .ic-remark;
  background-image: url(../../../img/helpCenter/cost_bg_tu-5.png);
}

.ic-r-weight {
  @extend .ic-remark;
  background-image: url(../../../img/helpCenter/cost_bg_tu-6.png);
}

.ic-r-liquor {
  @extend .ic-remark;
  background-image: url(../../../img/helpCenter/cost_bg_tu-7.png);
}

.ic-r-free {
  @extend .ic-remark;
  background-image: url(../../../img/helpCenter/cost_bg_tu-8.png);
}
</style>
