import { Dimensions, Image, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

import banner1 from "@/assets/banner/banner1.jpg";
import banner2 from "@/assets/banner/banner2.jpg";
import banner3 from "@/assets/banner/banner3.jpg";
import { APP_COLOR } from "@/utils/constants";
import React from "react";

const BannerHome = () => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const data = [
    { id: 1, source: banner1 },
    { id: 2, source: banner2 },
    { id: 3, source: banner3 },
  ];
  const width = Dimensions.get("window").width;
  const onPressPagination = (index: number) => {
    if (ref.current) {
      const currentIndex = Math.round(progress.value);
      ref.current.scrollTo({
        count: index - currentIndex,
        animated: true,
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        style={{
          position: "relative",
        }}
        ref={ref}
        width={width}
        height={width / 4}
        data={data}
        onProgressChange={progress}
        renderItem={({ item }) => (
          <Image
            style={{
              width: width,
              height: width / 3.7,
              resizeMode: "cover",
            }}
            source={item.source}
          />
        )}
      />
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 5,
          alignItems: "center",
        }}
      >
        <Pagination.Basic
          progress={progress}
          data={data}
          dotStyle={{
            backgroundColor: APP_COLOR.GREY,
            borderRadius: 50,
            width: 4,
            height: 4,
          }}
          activeDotStyle={{
            backgroundColor: APP_COLOR.ORANGE,
          }}
          containerStyle={{ gap: 5, marginTop: 10 }}
          onPress={onPressPagination}
        />
      </View>
    </View>
  );
};

export default BannerHome;
