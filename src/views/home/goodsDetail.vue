<template>
  <div class="goodsDetail">
    <div class="page-adr">
      <div class="page-center ub ub-ac">
        {{$t('head.home')}}>{{$t('goodsTypeDetail.productName')}}>{{$t('goodsTypeDetail.productDetails')}}
      </div>
    </div>
    <div v-if="pageState">
      <div class="goodsDetailBox page-center">
        <div class="leftGoodsImgBox">
          <div class="goodsImg">
            <img-enlarge v-model='picUrl'></img-enlarge>
          </div>
          <div class="goodsImgSelect">
            <ul>
              <li v-for="(item,index) of infoData.mainItemImgs" :class="{'current':imgsIndex == index}" @mousemove="goodsImgCSee(index,item)">
                <img :src="item">
              </li>
            </ul>
          </div>
          <div class="GoodsMottom">
            <div class="collection" :class="[collectionState ? 'not':'already']" @click="collectionGoods">
              <i></i>
              <span v-if="collectionState">{{$t('goodsTypeDetail.collectionOfThisProduct')}}</span>
              <span v-if="!collectionState">{{$t('goodsTypeDetail.theGoodsHaveBeenCollected')}}</span>
            </div>
          </div>
        </div>
        <div class="rightGoodsInfoBox">
          <h2>{{$i18n.locale == 'zh_CN' ? infoData.goodsName : completed[0] || infoData.goodsName}}</h2>
          <div class="originalAddress">
            <a :href="jumpUrl" target="_blank">{{$t('goodsTypeDetail.theOriginalAddress')}}></a>
          </div>
          <div class="important">
            <div class="priceCustomerService">
              <div class="price">
                {{$t('goodsTypeDetail.price')}}：
                <span>
                  <em>{{$store.state.exchangeRate.symbol}}</em>{{finallyPrice | currency}}</span>
              </div>
              <div class="customerService" @click="customerService">
                <i></i>
                <span>{{$t('orderCenter.contactCustomerService')}}</span>
              </div>
            </div>
            <div class="explain">
              <div>{{$t('goodsTypeDetail.freightInChina')}}：{{$store.state.exchangeRate.symbol}}0.00</div>
              <div>{{$t('goodsTypeDetail.noteThisPlatformChargesServiceCharge')}}
                <div class="goodsParameter">
                  <p class="arrow"></p>
                  <ul>
                    <li v-for="(item,index) of $store.state.ratio">
                      <span v-if="item.max === ''">
                        {{ $t('confirmOrder.theTotalPriceOfTheOrderIsGreater') | replace($store.state.exchangeRate.symbol+currency(item.min),'SS') | replace(item.cost * 100+'%','XX')}}
                      </span>
                      <span v-else-if="item.cost <= 1">
                        {{ $t('confirmOrder.TheTotalAmountOfOrdersChargedBetween') | replace($store.state.exchangeRate.symbol+currency(item.min)+'-'+$store.state.exchangeRate.symbol+currency(item.max),'SS') | replace(item.cost * 100+'%','XX')}}
                      </span>
                      <span v-else>
                        {{ $t('confirmOrder.TheTotalAmountOfOrdersChargedBetweenServiceFee') | replace($store.state.exchangeRate.symbol+currency(item.min)+'-'+$store.state.exchangeRate.symbol+currency(item.max),'SS') | replace($store.state.exchangeRate.symbol+currency(item.cost),'XX')}}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="range" :class="{'trigger':triggerState}">
            <div class="operationBox" v-for="(item,index) of specifications">
              <div class="label">{{$i18n.locale == 'zh_CN' ? item.name : completed[item.translationIndex] || item.name}}</div>
              <div class="selectConfiguration">
                <ul>
                  <li v-for="(newItem,newIndex) of item.infoList" :class="{'current':item.index == newIndex,'prohibit':newItem.state}" @click="specificationsClcik(index,newIndex,newItem.state)">
                    <div>
                      <img v-if="newItem.imgUrl" :src="newItem.imgUrl">
                      <span :class="{'selectPrompt':item.infoList.length > 12 && newItem.imgUrl}">{{$i18n.locale == 'zh_CN' ? newItem.valueName : completed[newItem.translationIndex] || newItem.valueName}}</span>
                      <p>×</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="operationBox textareaBox" v-if="infoData.goodsPrefix == 'JD'">
              <div class="label">{{$t('goodsTypeDetail.productDescription')}}</div>
              <div class="selectConfiguration">
                <textarea :placeholder="$t('goodsTypeDetail.inThisNoteRelatedAttributes')" v-model="description"></textarea>
                <div class="descriptionSize">
                  <span>{{description.length}} / 120</span>
                </div>
              </div>
            </div>
          </div>
          <div class="operationBox">
            <div class="label">{{$t('myCart.quantity')}}</div>
            <div class="selectNum">
              <span @click="reduce" :class="{'prohibit':goodsNum <= 1}">-</span>
              <input type="text" v-model="goodsNum">
              <span @click="plus" :class="{'prohibit':infoData.repositoryInfo && goodsNum >= parseInt(infoData.repositoryInfo.quantity)}">+</span>
              <p v-if="infoData.repositoryInfo">{{$t('goodsTypeDetail.stockPieces') | replace(infoData.repositoryInfo.quantity)}}</p>
            </div>
          </div>
          <div class="purchaseBox">
            <button class="purchase" @click="placeOrder(0)">{{$t('goodsTypeDetail.buyNow')}}</button>
            <button class="shoppingCart" @click="placeOrder(1)">
              <i></i>
              <span>{{$t('goodsTypeDetail.addToShoppingCart')}}</span>
            </button>
          </div>
        </div>
      </div>
      <div class="goodsDetailEvaluate  page-center">
        <div class="detailEvaluateNav">
          <div :class="{'current':evaluateCurrent == 0}" @click="detailsEvaluate(0)">{{$t('goodsTypeDetail.productDetails')}}</div>
          <span>/</span>
          <div :class="{'current':evaluateCurrent == 1}" @click="detailsEvaluate(1)">{{$t('goodsTypeDetail.cumulativeEvaluation')}}</div>
        </div>
        <div class="detailImgBox" v-show="evaluateCurrent == 0">
          <loading :value="(infoData.goodsPrefix == 'TMALL' || infoData.goodsPrefix == 'TB') && iframeLoading"></loading>
          <iframe :class="{'vb-h':iframeLoading || !iframeState}" v-if="infoData.goodsPrefix == 'TMALL' || infoData.goodsPrefix == 'TB'" ref="detailImg" @load="iframeHeight" :src="detailImgUrl"></iframe>
          <div class="detailJD" v-else-if="infoData.goodsPrefix == 'JD'" v-html="infoData.descUrl"></div>
          <div v-if="(iframeLoading == false && iframeState == false) && infoData.goodsPrefix != 'JD'" class="detailOther">{{$t('goodsTypeDetail.productDetailsCrawlingFailure')}}</div>
        </div>
        <!-- 商品评价 -->
        <div class="evaluation" v-show="evaluateCurrent == 1" ref="evaluation">
          <div v-if="infoData.goodsPrefix == 'TMALL' || infoData.goodsPrefix == 'TB'">
            <div class="title" v-if="impressionList.length>0">{{$t('goodsTypeDetail.everyoneImpression')}}</div>
            <div class="impression" v-if="impressionList.length>0">
              <ul>
                <li v-for="(item,index) of impressionList">{{item.title}}（{{item.count}}）</li>
              </ul>
            </div>
            <div class="title">{{$t('goodsTypeDetail.allEvaluation')}}</div>
            <div class="commentFilter">
              <ul>
                <li :class="{'current':rateType === ''}" @click="screenComment('')">
                  <i></i>
                  <span>{{$t('goodsTypeDetail.all')}}</span>
                </li>
                <li :class="{'current':rateType === 3}" @click="screenComment(3)">
                  <i></i>
                  <span>{{$t('goodsTypeDetail.image')}}（{{count.pic}}）</span>
                </li>
                <li :class="{'current':rateType === 2}" @click="screenComment(2)">
                  <i></i>
                  <span>{{$t('goodsTypeDetail.toPursue')}}（{{count.additional}}）</span>
                </li>
                <li :class="{'current':rateType === 1}" @click="screenComment(1)">
                  <i></i>
                  <span>{{$t('goodsTypeDetail.praise')}}（{{count.goodFull}}）</span>
                </li>
                <li :class="{'current':rateType === 0}" @click="screenComment(0)">
                  <i></i>
                  <span>{{$t('goodsTypeDetail.average')}}（{{count.normal}}）</span>
                </li>
                <li :class="{'current':rateType === -1}" @click="screenComment(-1)">
                  <i></i>
                  <span>{{$t('goodsTypeDetail.badReview')}}（{{count.bad}}）</span>
                </li>
              </ul>
            </div>
            <div class="evaluationBox">
              <div class="evaluationList" v-for="(item,index) of feedRateList">
                <div class="userImg">
                  <img :src="item.user.nickUrl || item.user.avatar">
                </div>
                <div class="userContent">
                  <h2>{{item.user.nick}}</h2>
                  <div class="time">
                    <span>{{item.date}}</span>
                    <span v-html="item.auction.sku"></span>
                  </div>
                  <div class="text" v-html="item.content"></div>
                  <div class="goodsImg">
                    <ul>
                      <li v-for="(newitem,newindex) of item.photos" :class="{'current':item.imgIndex === newindex}" @click="goodsImgEnlarge(newitem.url,index,newindex)">
                        <img :src="newitem.thumbnail">
                        <p></p>
                      </li>
                    </ul>
                  </div>
                  <div class="goodsImgEnlarge" v-if="item.imgUrl">
                    <img :src="item.imgUrl">
                  </div>
                  <div class="chaseRatings" v-for="(appitem,appindex) of item.appendList">
                    <div class="text">
                      <span v-if="appitem.dayAfterConfirm == 0">[{{$t('goodsTypeDetail.receiptOnTheSameDay')}}]</span>
                      <span v-else>[{{$t('goodsTypeDetail.receiptDaysAfterTheAddition') | replace(appitem.dayAfterConfirm)}}]</span>
                      {{appitem.content}}
                    </div>
                    <div class="goodsImg">
                      <ul>
                        <li v-for="(phoitem,phoindex) of appitem.photos" :class="{'current':appitem.imgIndex === phoindex}" @click="chaseRatingsEnlarge(phoitem.url,index,appindex,phoindex)">
                          <img :src="phoitem.thumbnail">
                          <p></p>
                        </li>
                      </ul>
                    </div>
                    <div class="goodsImgEnlarge" v-if="appitem.imgUrl">
                      <img :src="appitem.imgUrl">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <page-box v-show='feedRateList.length>= 20 || pageNo!=1' :total="totalSize" :last="false" :current-page="pageNo" @current-change="getFeedRateList"></page-box>
          </div>
          <div v-else class="detailOther">{{$t('goodsTypeDetail.productEvaluationCrawlingFailure')}}</div>
        </div>
      </div>
    </div>
    <div class="page-center noData" v-if="notSupport">
      <div>
        <i></i>
        <p>{{$t('goodsTypeDetail.thisPlatformDoesNotCurrentlySupportTheGoods')}}</p>
      </div>
    </div>
    <div class="page-center noData" v-if="beenShelved">
      <div>
        <i></i>
        <p>{{$t('goodsTypeDetail.sorryTheProductHasBeenOffTheShelf')}}</p>
      </div>
    </div>
    <loading v-model="loading"></loading>
  </div>
</template>
<script>
import { iframeUrl } from '@/config/env.js'
import { addCar, userSelectCollectExit, userAddCollect, crawler, feedRateList, detailCommon, translate } from '@/service/main/goods'
import { getRatio } from '@/service/main/order'
import { mapState, mapMutations } from 'vuex'
import loading from '@/components/common/loading/loading'
import pageBox from '@/components/common/page'
import imgEnlarge from '@/components/common/imgEnlarge'
export default {
  components: {
    loading,
    pageBox,
    imgEnlarge
  },
  data() {
    return {
      loading: true,
      pageState: false,//页面数据状态
      beenShelved: false,//已下架
      notSupport: false,//不支持该商品
      infoData: {},
      picUrl: '',
      goodsNum: 1,//商品数量
      specifications: [],//商品规格
      detailImgUrl: '',
      triggerState: false,
      minPrice: '',//最小价格
      maxPrice: '',//最大价格
      imgsIndex: 0,//图片索引
      collectionState: true,
      feedRateList: [],
      pageSize: 20,
      pageNo: 1,
      totalSize: '',
      total: '',
      description: '',//商品描述
      finallyPrice: '',//最终价格
      evaluateCurrent: 0,//详情和评价的显示
      evaluateList: [],//评价列表
      impressionList: [],//评价列表
      rateType: '',
      count: {},
      translation: [],
      completed: [],
      iframeLoading: false,
      iframeState: false,
      requestNum: 0,
    }
  },
  mounted() {
    this.detailInfo(this.goodsUrl);
  },
  computed: {
    goodsUrl() {
      return this.$route.query.searchKey.replace(/&/g, '%26');
    },
    jumpUrl() {
      return this.$route.query.searchKey;
    },
    evaluationTop() {
      return this.$refs.evaluation.offsetTop;
    }
  },
  watch: {
    goodsUrl(val) {
      this.loading = true;
      this.detailInfo(val);
    },
    goodsNum(val) {
      let goodsNum = parseInt(val);
      if (goodsNum == NaN || goodsNum < 1 || goodsNum > parseInt(this.infoData.repositoryInfo.quantity)) {
        this.goodsNum = 1;
      } else {
        this.goodsNum = goodsNum;
      }
    },
    description(val) {
      if (val.length > 120) {
        this.description = val.substring(0, 120);
      }
    }
  },
  methods: {
    ...mapMutations([
      'setOrderSubmitInfo',
      'setOrderLink'
    ]),
    pageData() {
      const _this = this;
      _this.getTranslate(_this.translation).then(
        data => {
          _this.completed = data;
        }
      )
    },
    priceCalculation() {
      const _this = this;
      if (_this.minPrice) {
        if (_this.maxPrice) {
          this.finallyPrice = _this.minPrice + '-' + _this.maxPrice;
        } else {
          this.finallyPrice = _this.minPrice;
        }
      } else if (_this.infoData.proRangePrice) {
        this.finallyPrice = _this.infoData.proRangePrice;
      } else if (_this.infoData.unitPrice) {
        this.finallyPrice = _this.infoData.unitPrice.priceCurrency;
      } else {
        this.finallyPrice = 0;
      }
    },
    //选择规格
    specificationsClcik(index, newIndex, state) {
      if (state) {
        if (this.specifications[index].index == newIndex) {
          this.specifications[index].index = -1;
          if (this.specifications[index].infoList[newIndex].imgUrl) {
            this.picUrl = this.infoData.picUrl;
            this.imgsIndex = 0;
          }
          this.goodeScreen();
        } else {
          this.specifications[index].index = newIndex;
          if (this.specifications[index].infoList[newIndex].imgUrl) {
            this.picUrl = this.specifications[index].infoList[newIndex].imgUrl;
            this.imgsIndex = -1;
          }
          this.goodeScreen(index);
        }
        this.triggerState = false;
      }
    },
    //商品选择筛选
    goodeScreen(index = null) {
      const _this = this;
      let specifications = this.specifications;
      let skuList = this.infoData.skuList;
      let allPrices = new Array();
      var finallyPrices = '';
      for (var s in specifications) {
        for (var info of specifications[s].infoList) {
          info.state = false;
        }
      }
      for (var item in skuList) {
        var condition = true;
        for (var i in specifications) {
          if (specifications[i].index != -1 && specifications[i].infoList[specifications[i].index].valueId != skuList[item].props[i].valueId) {
            condition = false;
          }
        }
        if (condition) {
          for (var props in skuList[item].props) {
            for (var infoList of specifications[props].infoList) {
              if (infoList.valueId == skuList[item].props[props].valueId) {
                infoList.state = true;
              }
            }
            skuList[item].props[props];
          }
          allPrices.push(parseFloat(skuList[item].price.price));
        }
      }
      allPrices = allPrices.sort();
      let len = allPrices.length;
      if (len > 1) {
        if (allPrices[0] == allPrices[len - 1]) {
          finallyPrices = allPrices[0];
          this.minPrice = finallyPrices ? finallyPrices : '';
          this.maxPrice = '';
        } else {
          finallyPrices = allPrices[0];
          this.minPrice = finallyPrices ? finallyPrices : '';
          const maxPrce = allPrices[len - 1];
          this.maxPrice = maxPrce ? maxPrce : '';
        }
      } else {
        finallyPrices = allPrices[0]
        this.minPrice = finallyPrices ? finallyPrices : '';
        this.maxPrice = '';
      }
      this.pageData();
      this.priceCalculation();
    },
    //下单接口
    placeOrder(val) {
      const _this = this;
      let finallyPrice = 0;
      if (_this.maxPrice) {
        finallyPrice = _this.minPrice + '-' + _this.maxPrice;
      } else {
        finallyPrice = _this.minPrice || _this.infoData.proRangePrice || _this.infoData.unitPrice.priceCurrency;
      }
      let quantityText = '';
      let quantityTextJoin = '';
      let goodsRemark
      if (this.$store.state.login) {
        let state = true;
        let goodsRemark = '';
        if (_this.infoData.goodsPrefix == 'JD') {
          quantityTextJoin = this.description;
          goodsRemark = [this.description];
        } else {
          goodsRemark = new Array();
          for (var item of this.specifications) {
            if (item.index == -1) {
              state = false;
            } else {
              goodsRemark.push(item.infoList[item.index].propName + '：' + item.infoList[item.index].valueName);
            }
          }
          quantityTextJoin = goodsRemark.join('#');
        }
        if (_this.infoData.repositoryInfo) {
          quantityText = _this.infoData.repositoryInfo.quantityText;
        }
        if (state) {
          if (val == 0) {
            _this.setOrderSubmitInfo({
              cartList: [
                {
                  imgUrl: _this.infoData.picUrl,
                  name: _this.infoData.goodsName,
                  price: finallyPrice,
                  productNo: _this.infoData.goodsId,
                  productNumber: _this.goodsNum,
                  productText: goodsRemark,
                  visitUrl: _this.$route.query.searchKey,
                }
              ],
              total: parseFloat(finallyPrice) * parseFloat(_this.goodsNum),
              allNum: _this.goodsNum,
              type: 1
            });
            _this.$router.push('/confirmOrder');
          } else {
            addCar(_this.infoData.goodsId, _this.infoData.goodsName, _this.infoData.picUrl, _this.$route.query.searchKey, finallyPrice, _this.goodsNum, quantityText, quantityTextJoin).then(data => {
              if (data.success) {
                _this.$parent.$refs.confirm.tip('goodsTypeDetail.addedSuccessfully', true);
                _this.$parent.cartNum();
              } else {
                _this.$parent.$refs.confirm.tip('goodsTypeDetail.addFailed', false);
              }
            })
          }
        } else {
          this.triggerState = true;
        }
      } else {
        this.$parent.$refs.confirm.show(_this.$t('head.youAreNotLoggedInAreYouLoggedIn'), true, function() {
          _this.$router.push('/login');
        });
      }
    },
    //页面数据
    detailInfo(url) {
      const _this = this;
      let specifications = new Array();
      let record = new Array();
      let i = 1;
      this.specifications = [];
      this.loading = true;
      let translationStatistics = new Array();
      let translationIndex = 0;
      crawler(url).then(
        data => {
          if (data.state == 0) {
            if (data.data.productProps) {
              translationStatistics.push({ index: translationIndex, text: data.data.goodsName });
              translationIndex++;
              for (var item of data.data.productProps) {
                if (record[item.propName] != undefined) {
                  specifications[record[item.propName]].infoList.push({ translationIndex: translationIndex, imgUrl: item.imgUrl ? item.imgUrl : '', propId: item.propId, propName: item.propName, valueId: item.valueId, valueName: item.valueName, state: true });
                  translationStatistics.push({ index: translationIndex, text: item.valueName });
                  translationIndex++;
                } else {
                  specifications.push({ translationIndex: translationIndex, name: item.propName, type: item.imgUrl ? 1 : 0, index: -1, infoList: [{ translationIndex: translationIndex + 1, imgUrl: item.imgUrl ? item.imgUrl : '', propId: item.propId, propName: item.propName, valueId: item.valueId, valueName: item.valueName, state: true }] });
                  translationStatistics.push({ index: translationIndex, text: item.propName });
                  translationStatistics.push({ index: translationIndex + 1, text: item.valueName });
                  translationIndex += 2;
                  record[item.propName] = i - 1;
                  i++;
                }
              }
              _this.specifications = specifications;
              _this.translation = translationStatistics;
              _this.infoData = data.data;
              _this.goodeScreen();
              _this.getTranslate(_this.translation).then(
                data => {
                  _this.completed = data;
                }
              )
            } else {
              translationStatistics.push({ index: translationIndex, text: data.data.goodsName });
              translationIndex++;
              _this.infoData = data.data;
              _this.translation = translationStatistics;
              _this.pageData();
              _this.priceCalculation();
              _this.getTranslate(_this.translation).then(
                data => {
                  _this.completed = data;
                }
              )
            }
            _this.picUrl = data.data.picUrl;
            _this.detailImgUrl = iframeUrl + 'https://hws.m.taobao.com/cache/wdesc/5.0?id=' + data.data.goodsId + '&f=TB1gz9lSFXXXXX6XFXX8qtpFXlX';
            if (_this.$store.state.login) {
              //查询商品是否已收藏
              userSelectCollectExit(data.data.goodsId).then(
                data => {
                  if (data.success) {
                    _this.collectionState = true;
                  } else {
                    _this.collectionState = false;
                  }
                }
              );
            }
            _this.loading = false;
            this.pageState = true;
            if (data.data.goodsPrefix == 'TMALL' || data.data.goodsPrefix == 'TB') {
              this.iframeLoading = true;
              this.iframeState = true;
            }
          }
          //   else if (data.state == 70001) {
          //   this.notSupport = true;
          //   this.pageState = false;
          //   _this.loading = false;
          // }
          else if (data.state == 70003) {
            if (this.requestNum < 5) {
              setTimeout(function() {
                _this.detailInfo(_this.goodsUrl);
                _this.requestNum++;
              }, 1000)
            } else {
              this.beenShelved = true;
              this.pageState = false;
              _this.loading = false;
            }
          } else {
            _this.$parent.$refs.confirm.tip(data.msg, false);
            this.pageState = false;
            _this.loading = false;
            _this.setOrderLink(_this.jumpUrl);
            _this.$router.push('/linkOrder');
          }
        }
      );
    },
    detailsEvaluate(index) {
      this.evaluateCurrent = index;
      if (index == 1 && (this.evaluateList.length <= 0 || this.impressionList.length <= 0)) {
        this.feedRate();
      }
    },
    feedRate() {
      const _this = this;
      if (_this.infoData.goodsPrefix == 'TMALL' || _this.infoData.goodsPrefix == 'TB') {
        var reg = new RegExp('[?|&]id=([^&]*)(&|$)', 'i');
        var goodsId = this.goodsUrl.replace(/%26/g, '&').match(reg);
        detailCommon(goodsId[1]).then(
          dataCommon => {
            if (dataCommon.data.impress) {
              _this.impressionList = dataCommon.data.impress;
            }
            if (dataCommon.data.count) {
              _this.count = dataCommon.data.count;
            }
            this.getFeedRateList();
          }
        );
      }
    },
    screenComment(val) {
      this.rateType = val;
      this.getFeedRateList();
    },
    getFeedRateList(val) {
      if (val) {
        this.pageNo = val;
      }
      const _this = this;
      var reg = new RegExp('[?|&]id=([^&]*)(&|$)', 'i');
      var goodsId = this.goodsUrl.replace(/%26/g, '&').match(reg);
      feedRateList(goodsId[1], this.pageNo, this.rateType, this.pageSize).then(
        dataRate => {
          for (var item of dataRate.comments) {
            item.imgIndex = '';
            item.imgUrl = '';
            for (var append of item.appendList) {
              append.imgIndex = '';
              append.imgUrl = '';
            }
          }
          this.feedRateList = dataRate.comments;
          this.total = dataRate.total;
          this.totalSize = parseInt(dataRate.total / this.pageSize);
          console.log(this.evaluationTop);
          document.body.scrollTop = this.evaluationTop;
        }
      );
    },
    goodsImgEnlarge(url, index, newIndex) {
      let feedRateList = this.feedRateList;
      if (newIndex === feedRateList[index].imgIndex) {
        feedRateList[index].imgIndex = '';
        feedRateList[index].imgUrl = '';
      } else {
        feedRateList[index].imgIndex = newIndex;
        feedRateList[index].imgUrl = url;
      }
      this.feedRateList = feedRateList;
    },
    chaseRatingsEnlarge(url, index, appindex, phoindex) {
      let feedRateList = this.feedRateList;
      if (phoindex === feedRateList[index].appendList[appindex].imgIndex) {
        feedRateList[index].appendList[appindex].imgIndex = '';
        feedRateList[index].appendList[appindex].imgUrl = '';
      } else {
        feedRateList[index].appendList[appindex].imgIndex = phoindex;
        feedRateList[index].appendList[appindex].imgUrl = url;
      }
      this.feedRateList = feedRateList;
    },
    iframeHeight() {
      const _this = this;

      function calcPageHeight(doc) {
        var cHeight = Math.max(doc.body.clientHeight, doc.documentElement.clientHeight)
        var sHeight = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight)
        var height = Math.max(cHeight, sHeight)
        console.log(cHeight, sHeight);
        return height
      }
      setTimeout(() => {
        _this.iframeLoading = false;
        _this.iframeState = false;
        var detailImg = this.$refs.detailImg;
        var iDoc = detailImg.contentDocument || detailImg.document;
        var height = calcPageHeight(iDoc);
        detailImg.style.height = height + 'px';
        const imgList = iDoc.getElementsByTagName("img");
        var style = document.createElement("style");
        style.innerHTML = 'body {background-color: #FFF;overflow: hidden;}.content {text-align: center;background-color: #FFF;}.anchors {display:none}table {margin: 0px auto!important;}';
        iDoc.head.appendChild(style);
        for (var item of imgList) {
          if (item.getAttribute('data-img')) {
            item.src = item.getAttribute('data-img');
          }
        }
        _this.iframeLoading = false;
        _this.iframeState = true;
      }, 500);


    },
    reduce() {
      let goodsNum = parseInt(this.goodsNum);
      if (goodsNum > 1) {
        this.goodsNum = goodsNum - 1;
      }
    },
    plus() {
      let goodsNum = parseInt(this.goodsNum);
      if (goodsNum < parseInt(this.infoData.repositoryInfo.quantity)) {
        this.goodsNum = goodsNum + 1;
      }
    },
    //图片选择
    goodsImgCSee(index, url) {
      this.imgsIndex = index;
      this.picUrl = url;
    },
    //联系客服
    customerService() {
      const _this = this;
      $zopim(function() {
        $zopim.livechat.window.show();
        $zopim.livechat.setLanguage(_this.$store.state.locale.type);
        $zopim.livechat.say(_this.$t('goodsTypeDetail.productLink') + '：' + _this.$route.query.searchKey);
      });
    },
    //商品收藏
    collectionGoods() {
      const _this = this;
      if (this.$store.state.login) {
        if (this.collectionState) {
          let finallyPrice = 0;
          if (_this.maxPrice) {
            finallyPrice = _this.minPrice + '-' + _this.maxPrice;
          } else {
            finallyPrice = _this.minPrice || _this.infoData.proRangePrice || _this.infoData.unitPrice.priceCurrency;
          }
          userAddCollect(_this.$store.state.locale.type, _this.infoData.goodsId, _this.infoData.goodsName, _this.infoData.picUrl, _this.$route.query.searchKey.replace(/&/g, '%26'), finallyPrice).then(
            data => {
              if (data.success) {
                _this.$parent.$refs.confirm.tip(_this.$t('goodsTypeDetail.successfulCollectionOfGoods'), true);
                _this.collectionState = false;
              } else {
                _this.$parent.$refs.confirm.tip(_this.$t('goodsTypeDetail.productCollectionFailed'), false);
              }
            }
          );
        }
      } else {
        this.$parent.$refs.confirm.show(_this.$t('head.youAreNotLoggedInAreYouLoggedIn'), true, function() {
          _this.$router.push('/login');
        });
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/components/main';
@import '../../style/goodsDetail';
</style>
