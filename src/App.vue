<template>
    <div id="app">
        <!--Header block-->
        <header class="col-12">
            <div class="logo-flag">
                <img src="/static/Flag_1.gif" alt="">
            </div>
            <!--Logo block-->
            <div class="logo">
                <!--Title logo block-->
                <span class="span-red logo-title">охотники за потолками</span>
                <span class="logo-subtitle">онлайн-калькулятор</span>
                <!--end title logo block-->
            </div>
            <!--end logo block-->
        </header>
        <!--end header block-->
        <!--Content block-->
        <main>
            <!--Calculator container-->
            <div class="container calculator-container col-12 row d-flex justify-content-center">
                <!--Calculator block-->
                <div class="calculator-box col-lg-8 col-xs-12">
                    <!--Calculator header-->
                    <div class="calculator-header">
                        <!--Calculator tabs-->
                        <ul class="nav nav-tabs row col-12 no-pm">
                            <li class="nav-item col-6 no-padding" v-for="room in rooms" :key="room"
                                @click="activeRoom = room">
                                <span class="nav-link" :class="{active: activeRoom === room}">{{ room }}</span>
                            </li>
                        </ul>
                        <!--end calculator tabs-->
                    </div>
                    <!--end calculator header-->
                    <!--Calculator content-->
                    <div class="calculator-content row">
                        <!--Filters-->
                        <div class="col-12 row no-pm filters-box" v-show="activeRoom === 'комната'">
                            <div class="col-3 filter-box no-pm">
                                <label class="filter-label">Спот</label>
                                <toggle-button :value="false" color="#4573D4" :sync="true" v-model="filterLight"/>
                            </div>
                            <div class="col-3 filter-box no-pm">
                                <label class="filter-label">Карниз</label>
                                <toggle-button :value="false" color="#4573D4" :sync="true" v-model="filterCornice"/>
                            </div>
                            <div class="col-3 filter-box no-pm" v-if="activeRoom === 'комната'">
                                <label class="filter-label">Ниша</label>
                                <toggle-button :value="false" color="#4573D4" :sync="true" v-model="filterNiche"/>
                            </div>
                            <div class="col-3 filter-box no-pm" v-if="activeRoom === 'комната'">
                                <label class="filter-label">2 уровня</label>
                                <toggle-button :value="false" color="#4573D4" :sync="true" v-model="filterLevel"/>
                            </div>
                        </div>
                        <div class="col-12 row no-pm filters-box" v-show="activeRoom === 'санузел'">
                            <div class="col-12 filter-box no-pm">
                                <label class="filter-label">Спот</label>
                                <toggle-button :value="false" color="#4573D4" :sync="true"
                                               v-model="filterLightBathroom"/>
                            </div>
                        </div>
                        <!--end filters-->
                        <!--Titles-->
                        <div class="col-12 slider-nav-title d-flex justify-content-center"
                             v-if="activeRoom === 'комната'">
                            <p>Тип полотна: {{ chooseRoomCanvas }}</p>
                        </div>
                        <div class="col-12 slider-nav-title d-flex justify-content-center"
                             v-if="activeRoom === 'санузел'">
                            <p>Тип помещения: {{ chooseRoomBathCanvas }}</p>
                        </div>
                        <!--end titles-->
                        <!--Slider-->
                        <div class="col-12 no-pm">
                            <div class="content-slider-nav no-pm col-12" v-show="activeRoom === 'комната'">
                                <vue-slider ref="slider" :contained="true" :hide-label="true" class="col-12"
                                            v-model="chooseRoomCanvas"
                                            :data="roomcanvas"
                                            :marks="true"
                                            :tooltip="'none'"></vue-slider>
                            </div>
                            <div class="content-slider-nav no-pm col-12" v-show="activeRoom === 'санузел'">
                                <vue-slider ref="slider" :contained="true" :hide-label="true" class="col-12"
                                            v-model="chooseRoomBathCanvas"
                                            :data="bathroomcanvas"
                                            :marks="true"
                                            :tooltip="'none'"></vue-slider>
                            </div>
                        </div>
                        <!--End slider-->
                        <div class="col-12 slider-for no-pm">
                            <!--Calculator-forms-->
                            <div class="content-slider-for" v-if="activeRoom === 'комната'">
                                <div class="content-calculation row">
                                    <div class="col-12 row form-box">
                                        <label for="QuadMeters" class="label-form">Квадратные метры</label>
                                        <input type="number" v-model="quadmeters" name="QuadMeters"
                                               class="input-form col-12" id="QuadMeters">
                                    </div>
                                </div>
                                <div class="content-calculation row" v-if="filterCornice">
                                    <div class="col-12 row form-box">
                                        <label for="Cornice" class="label-form">Карниз (погонный метр)</label>
                                        <input type="number" v-model="cornice" name="Cornice"
                                               class="input-form col-12"
                                               id="Cornice">
                                    </div>
                                </div>
                                <div class="content-calculation row" v-if="filterNiche">
                                    <div class="col-12 row form-box">
                                        <label for="Niche" class="label-form">Ниша (погонный метр)</label>
                                        <input type="number" v-model="niche" name="Niche" class="input-form col-12"
                                               id="Niche">
                                    </div>
                                </div>
                                <!--<div class="error" v-if="error">Значение не должно быть меньше 5</div>-->
                                <div class="content-calculation row" v-if="filterLight">
                                    <div class="col-12 row form-box">
                                        <label for="Lights" class="label-form">Споты</label>
                                        <input type="number" name="Lights" v-model="lights"
                                               class="input-form col-12"
                                               id="Lights">
                                    </div>
                                </div>
                                <div class="content-calculation row" v-if="filterLevel">
                                    <div class="col-12 row form-box">
                                        <label for="TwoLevel" class="label-form">2 уровня (погонный метр)</label>
                                        <input type="number" name="TwoLevel" v-model="levels"
                                               class="input-form col-12"
                                               id="TwoLevel">
                                    </div>
                                </div>
                            </div>
                            <div class="content-slider-for" v-if="activeRoom === 'санузел'">
                                <div class="content-calculation row">
                                    <div class="col-12 row form-box">
                                        <label for="QuadMeters" class="label-form">Квадратные метры</label>
                                        <input type="number" v-model="quadmetersbathroom" name="QuadMeters"
                                               class="input-form col-12">
                                    </div>
                                </div>
                                <div class="content-calculation row" v-if="filterLightBathroom">
                                    <div class="col-12 row form-box">
                                        <label for="Lights" class="label-form">Споты</label>
                                        <input type="number" name="Lights" v-model="lightsbathroom"
                                               class="input-form col-12">
                                    </div>
                                </div>
                            </div>
                            <!--End calculator-forms-->
                        </div>
                        <!--Price content-->
                        <div class="content-price">
                            <p>{{ SetQuadMetersWithCanvas }}</p>
                        </div>
                        <!--end price content-->
                    </div>
                    <!--end calculator content-->
                </div>
                <!--end calculator box-->
            </div>
            <!--end calculator container-->
        </main>
        <!--end content block-->
    </div>
</template>
<script>
    import Vue from 'vue'
    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/antd.css'

    export default {
        name: 'App',
        components: {
            Vue,
            VueSlider
        },
        data() {
            return {
                activeRoom: 'комната',
                chooseRoomCanvas: 'эконом',
                chooseRoomBathCanvas: 'кафель',
                quadmeters: 5,
                quadmetersbathroom: 1,
                QuadMetersWithCanvasPrice: 0,
                lights: 1,
                lightsbathroom: 1,
                levels: 1,
                niche: 1,
                cornice: 1,
                filterLight: false,
                filterLightBathroom: false,
                filterLevel: false,
                filterCornice: false,
                filterNiche: false,
                profile: 20,
                insert: 10,
                tube: 200,
                work: 160,
                withoutlightprice: 350,
                withlightprice: 500,
                corniceprice: 800,
                nicheprice: 400,
                levelsprice: 2400,
                tileprice: 1200,
                stoneware: 1900,
                rooms: {
                    room: 'комната',
                    bathroom: 'санузел'
                },
                bathroomcanvas: ['кафель', 'керамогранит'],
                roomcanvas: ['эконом', 'стандарт', 'премиум', 'противопожарное', 'ткань', 'парящий потолок']
            }
        },
        methods: {
            DefaultWork(quadmeters) {
                var result = 0
                result += this.profile * quadmeters
                result += this.insert * quadmeters
                result += this.tube
                result += this.work * quadmeters
                return result
            },
            UpgradeWork() {
                var upgrade = 0

                if (this.filterLight) {
                    if (this.lights <= 0) {
                        upgrade += this.withoutlightprice
                    } else {
                        upgrade += this.withlightprice * this.lights
                    }
                } else {
                    upgrade += this.withoutlightprice
                }

                if (this.filterCornice) {
                    if (this.cornice > 0) {
                        upgrade += this.cornice * this.corniceprice
                    }
                }

                if (this.filterNiche) {
                    if (this.niche > 0) {
                        upgrade += this.niche * this.nicheprice
                    }
                }

                if (this.filterLevel) {
                    if (this.levels > 0) {
                        upgrade += this.levels * this.levelsprice
                    }
                }


                return upgrade
            },
            UpgradeWorkBathRoom() {
                var upgradebathroom = 0

                if (this.filterLightBathroom) {
                    if (this.lightsbathroom >= 1) {
                        upgradebathroom += this.withlightprice * this.lightsbathroom
                    }
                }

                return upgradebathroom
            }
        },
        computed: {
            canvasPriceRoom() {
                switch (this.chooseRoomCanvas) {
                    case 'эконом':
                        return 100
                        break
                    case 'стандарт':
                        return 240
                        break
                    case 'премиум':
                        return 360
                        break
                    case 'противопожарное':
                        return 800
                        break
                    case 'ткань':
                        return 1200
                        break
                    case 'парящий потолок':
                        return 1500
                        break
                }
            },
            canvasPriceBathRoom() {
                switch (this.chooseRoomBathCanvas) {
                    case 'кафель':
                        return 1200
                        break
                    case 'керамогранит':
                        return 1900
                        break
                }
            },
            SetQuadMetersWithCanvas() {
                let self = this

                if (self.activeRoom === 'комната') {
                    self.QuadMetersWithCanvasPrice = 0
                    if (self.quadmeters >= 5) {
                        self.QuadMetersWithCanvasPrice = self.canvasPriceRoom * self.quadmeters
                        if (self.quadmeters < 10) {
                            self.QuadMetersWithCanvasPrice += self.DefaultWork(self.quadmeters)
                            self.QuadMetersWithCanvasPrice += self.UpgradeWork(self.quadmeters)
                            self.QuadMetersWithCanvasPrice += self.QuadMetersWithCanvasPrice / 100 * 30
                            return self.QuadMetersWithCanvasPrice
                        }
                        self.QuadMetersWithCanvasPrice += self.DefaultWork(self.quadmeters)
                        self.QuadMetersWithCanvasPrice += self.UpgradeWork(self.quadmeters)
                        return self.QuadMetersWithCanvasPrice
                    }

                } else if (self.activeRoom === 'санузел') {
                    self.QuadMetersWithCanvasPrice = 0
                    if (self.quadmetersbathroom >= 1) {
                        self.QuadMetersWithCanvasPrice = self.canvasPriceBathRoom * self.quadmetersbathroom
                        self.QuadMetersWithCanvasPrice += self.UpgradeWorkBathRoom()
                        return self.QuadMetersWithCanvasPrice
                    }
                }

            }
        }
    }
</script>

<style lang="scss">

    /* Mixin */

    $font-family: '8477';
    $blue: #4573D5;
    $white: #fff;
    $black: #000;
    %flexbox {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    /* End mixin */

    /* Fonts */

    @font-face {
        font-family: 'Afisha';
        src: url('assets/fonts/Afisha.ttf');
    }

    @font-face {
        font-family: 'Truth';
        src: url('assets/fonts/Truth.ttf');
    }

    @font-face {
        font-family: '8477';
        src: url('assets/fonts/8477.ttf');
    }

    /* End fonts */

    /* Resets */

    .no-padding {
        padding: 0 !important;
    }

    .no-margin {
        margin: 0 !important;
    }

    .no-pm {
        padding: 0 !important;
        margin: 0 !important;
    }

    p,
    label,
    .row {
        margin: 0 !important;
    }

    * {
        outline: none !important;
    }

    ::-webkit-scrollbar {
        width: 0;
        background: transparent;
    }

    /* End resets */

    /* General */

    html,
    body {
        font-family: $font-family !important;
        overflow-x: hidden;
        user-select: none;
        scrollbar-width: none;
        min-width: 270px;
    }

    #app {
        width: 100%;
        max-width: 1600px;
        margin: 0 auto;
        min-height: 100vh;
        background-color: $white;
    }

    /* end general */

    /* User styles */
    .span-red {
        color: $blue;
    }

    .vue-slider-mark-label {
        font-size: 1em;
    }

    .nav-tabs .nav-link.active {
        background-color: $blue !important;
        color: $white !important;
    }

    .vue-slider-mark-step-active,
    .vue-slider-mark-step:hover,
    .vue-slider-mark-step-active:hover,
    .vue-slider-mark-step-active-active {
        box-shadow: 0 0 0 2px $blue !important;
    }

    /* end user styles */

    /* Header */

    header {
        width: 100%;
        padding: 10px !important;
        display: flex !important;
        justify-content: space-between;
        min-height: 100px;
    }

    .logo {
        color: $black;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .logo-title {
        font-size: 1rem;
        text-align: center;
    }

    .logo-flag,
    .logo-flag > img {
        height: 80px;
    }

    .logo-subtitle {
        font-family: 'Truth';
        font-size: 1rem;
        text-align: center;
    }

    /* end header */

    /* Content */

    main {
        max-width: 1600px;
        margin: 25px auto;
        padding: 0 15px;
    }

    .calculator-container {
        padding: 0 !important;
    }

    .calculator-content {
        padding: 0 10px;
    }

    .vue-slider-dot {
        width: 16px !important;
        height: 16px !important;
    }

    .vue-slider-dot-handle {
        animation: pulse 2s infinite;
    }

    .vue-slider-rail {
        background-color: #bfcbd9 !important;
    }

    .vue-slider-process {
        background-color: $blue !important;
    }

    .vue-slider-dot-handle {
        background-color: $white !important;
        border-color: $blue !important;
    }

    .calculator-box {
        padding: 0 !important;
    }

    .nav-link {
        font-size: 1rem;
        text-align: center;
        cursor: pointer;
    }

    .slider-nav {
        height: 100px;
    }

    .slider-nav-title {
        padding: 30px 0 10px 0;
        font-size: 1em;
    }

    .content-slider-nav {
        width: 100%;
        height: 50px !important;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: 2em;
    }

    .content-calculation {
        width: 100%;
        margin: 0;
    }

    .form-box {
        padding: 10px 0 !important;
        position: relative !important;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .input-form {
        font-size: 1em;
        border-radius: 40px;
        border: 1px solid #bfcbd9 !important;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        padding: 10px 10px !important;
    }

    .label-form {
        position: absolute;
        z-index: 1;
        font-size: 1em;
        opacity: 0.2;
    }

    .error {
        padding-left: 10px;
        font-size: 1em;
    }

    .filter-label {
        font-family: 'Truth';
        letter-spacing: 0 !important;
        font-size: 1em;
    }

    .filter-box {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .filters-box {
        margin: 10px 0 !important;
    }

    .content-price {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 25px;
        font-size: 2em;
        color: $blue;
    }

    /* end content */

    /* Animations */

    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(17, 66, 170, 0.7);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(17, 66, 170, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(17, 66, 170, 0);
        }
    }

    /* end animations */

    /* Media queryes */

    @media all and (max-width: 460px) {
        header {
            flex-direction: column !important;
        }
        .logo-flag {
            display: flex;
            justify-content: center;
        }
        .logo {
            margin-top: 25px;
        }
        .nav-link,
        .slider-nav-title,
        .label-form {
            font-size: 0.8rem;
        }
    }

    /* End media queryes */

</style>
