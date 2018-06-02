const weatherMap= {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
};
const weatherBackground = {
  'sunny': '#c4efff',
  'cloudy': '#daeef7',
  'overcast': '#c4ced2',
  'lightrain': '#b6d6e2',
  'heavyrain': '#c3ccd0',
  'snow': '#99e3ff'
}
Page({
  onLoad(){
    this.getNow();
  },
  onPullDownRefresh(){
    this.getNow(() => {
      wx.stopPullDownRefresh();
    });
  },
  data:{
    temp:"",
    weather:"",
    weather_bg:'',
    hourlyWeather: []
  },
  getNow(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: "广州市"
      },
      success: res => {
        let result = res.data.result;
        let temp = result.now.temp;
        let weather = result.now.weather;
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherBackground[weather],
        });
        let nowHour = new Date().getHours();
        let hourlyWeather = [];
        let forecasts = result.forecast;
        console.log(forecasts);
        for(let i = 0; i < 24; i+=3){
          hourlyWeather.push({
            time: (i + nowHour) % 24 + '时',
            iconPath: '/images/' + forecasts[i / 3].weather + '-icon.png',
            temp: forecasts[i / 3].temp + '°'
          });
        };
        hourlyWeather[0].time = '现在';
        this.setData({
          temp: temp + '°',
          weather: weatherMap[weather],
          weather_bg: '/images/' + weather + '-bg.png',
          hourlyWeather: hourlyWeather
        });
      },
      complete:() =>{
        callback && callback();
      }
    })
  }
})
