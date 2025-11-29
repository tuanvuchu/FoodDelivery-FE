import { FlatList, Image, Text, View } from "react-native";

const data = [
  {
    key: 1,
    name: "Bánh Canh Cua",
    source: require("@/assets/images/banh_canh_cua.png"),
  },
  { key: 2, name: "Bánh Mì", source: require("@/assets/images/banh_mi.png") },
  {
    key: 3,
    name: "Bánh Tacos",
    source: require("@/assets/images/banh_tacos.png"),
  },
  {
    key: 4,
    name: "Bánh Tráng",
    source: require("@/assets/images/banh_trang.png"),
  },
  {
    key: 5,
    name: "Bánh Tráng Trộn",
    source: require("@/assets/images/banh_trang_tron.png"),
  },
  {
    key: 6,
    name: "Bánh Trung Thu",
    source: require("@/assets/images/banh_trung_thu.png"),
  },
  { key: 7, name: "Bánh Xèo", source: require("@/assets/images/banh_xeo.png") },
  { key: 8, name: "Bún", source: require("@/assets/images/bun.png") },
  {
    key: 9,
    name: "Bún Đậu Mắm Tôm",
    source: require("@/assets/images/bun_dau_mam_tom.png"),
  },
  {
    key: 10,
    name: "Bún Thịt Nướng",
    source: require("@/assets/images/bun_thit_nuong.png"),
  },
  {
    key: 11,
    name: "Cá Viên Chiên",
    source: require("@/assets/images/ca_vien_chien.png"),
  },
  {
    key: 12,
    name: "Chân Gà Nướng",
    source: require("@/assets/images/chan_ga_nuong.png"),
  },
  {
    key: 13,
    name: "Cháo Sườn",
    source: require("@/assets/images/chao_suon.png"),
  },
  { key: 14, name: "Chè", source: require("@/assets/images/che.png") },
  {
    key: 15,
    name: "Cơm Gà Xối Mỡ",
    source: require("@/assets/images/com_ga_xoi_mo.png"),
  },
  {
    key: 16,
    name: "Cơm Niêu",
    source: require("@/assets/images/com_nieu.png"),
  },
  {
    key: 17,
    name: "Cơm Rang Dưa Bò",
    source: require("@/assets/images/com_rang_dua_bo.png"),
  },
  { key: 18, name: "Cơm Tấm", source: require("@/assets/images/com_tam.png") },
  { key: 19, name: "Gà Rán", source: require("@/assets/images/ga_ran.png") },
  {
    key: 20,
    name: "Gà Ủ Muối",
    source: require("@/assets/images/ga_u_muoi.png"),
  },
  {
    key: 21,
    name: "Matcha Latte",
    source: require("@/assets/images/matcha_latte.png"),
  },
  {
    key: 22,
    name: "Miến Trộn",
    source: require("@/assets/images/mien_tron.png"),
  },
  {
    key: 23,
    name: "Mì Trộn Indomie",
    source: require("@/assets/images/mi_tron_indomie.png"),
  },
  {
    key: 24,
    name: "Mì Tương Đen",
    source: require("@/assets/images/mi_tuong_den.png"),
  },
  {
    key: 25,
    name: "Nem Nướng",
    source: require("@/assets/images/nem_nuong.png"),
  },
  {
    key: 26,
    name: "Nước Dừa",
    source: require("@/assets/images/nuoc_dua.png"),
  },
  {
    key: 27,
    name: "Phở Cường",
    source: require("@/assets/images/pho_cuong.png"),
  },
  { key: 28, name: "Pizza", source: require("@/assets/images/pizza.png") },
  { key: 29, name: "Trà Sữa", source: require("@/assets/images/tra_sua.png") },
  {
    key: 30,
    name: "Tré Trộn",
    source: require("@/assets/images/tre_tron.png"),
  },
];

const DefaultResult = () => {
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 10,
        gap: 10,
        marginBottom: 20,
      }}
    >
      <Text style={{ fontWeight: "600" }}>Gợi ý tìm kiếm</Text>
      <FlatList
        data={data}
        numColumns={3}
        renderItem={({ item }) => (
          <View
            style={{
              alignItems: "center",
              padding: 5,
              marginBottom: 5,
              gap: 3,
            }}
          >
            <Image source={item.source} style={{ height: 100, width: 100 }} />
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default DefaultResult;
