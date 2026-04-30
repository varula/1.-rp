import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Platform,
  DimensionValue,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

const activeOrders = [
  { po: "PO-2026-0847", buyer: "LEVI'S", style: "501-XX-RAW", qty: 5000, status: "SEWING", due: "22-MAR", progress: 68 },
  { po: "PO-2026-0851", buyer: "GAP", style: "SLIM-DARK", qty: 3200, status: "CUTTING", due: "28-MAR", progress: 32 },
  { po: "PO-2026-0839", buyer: "H&M", style: "WIDE-STONE", qty: 8000, status: "WASH", due: "18-MAR", progress: 81 },
  { po: "PO-2026-0855", buyer: "UNIQLO", style: "STRAIGHT-IND", qty: 6000, status: "STORE", due: "05-APR", progress: 12 },
  { po: "PO-2026-0842", buyer: "ZARA", style: "SKINNY-BLK", qty: 4500, status: "FINISHING", due: "15-MAR", progress: 92 },
  { po: "PO-2026-0862", buyer: "LEVI'S", style: "511-SLIM-BRK", qty: 3800, status: "QC", due: "30-MAR", progress: 76 },
  { po: "PO-2026-0830", buyer: "MANGO", style: "WIDE-INDIGO", qty: 2400, status: "SHIP", due: "10-MAR", progress: 99 },
];

type Order = typeof activeOrders[0];

const ALERT_STATUSES = new Set(["SEWING", "QC"]);

function OrderRow({ item }: { item: Order }) {
  const colors = useColors();
  const isAlert = ALERT_STATUSES.has(item.status);
  const statusColor = isAlert ? colors.accent : colors.secondary;
  const barColor = item.progress >= 80 ? colors.secondary : item.progress >= 50 ? colors.primary : colors.accent;
  const barWidth: DimensionValue = `${item.progress}%`;

  return (
    <View style={[styles.orderCard, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
      <View style={styles.orderTop}>
        <View style={styles.orderLeft}>
          <Text style={[styles.orderPo, { color: colors.primary }]}>{item.po}</Text>
          <Text style={[styles.orderBuyer, { color: colors.foreground }]}>{item.buyer}</Text>
        </View>
        <View style={[styles.statusBadge, { borderColor: statusColor }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.orderMeta}>
        <Text style={[styles.metaLabel, { color: colors.mutedForeground }]}>STYLE</Text>
        <Text style={[styles.metaValue, { color: colors.foreground }]}>{item.style}</Text>
        <Text style={[styles.metaDivider, { color: colors.border }]}>|</Text>
        <Text style={[styles.metaLabel, { color: colors.mutedForeground }]}>QTY</Text>
        <Text style={[styles.metaValue, { color: colors.foreground }]}>{item.qty.toLocaleString()}</Text>
        <Text style={[styles.metaDivider, { color: colors.border }]}>|</Text>
        <Text style={[styles.metaLabel, { color: colors.mutedForeground }]}>DUE</Text>
        <Text style={[styles.metaValue, { color: colors.foreground }]}>{item.due}</Text>
      </View>

      <View style={styles.progressRow}>
        <View style={[styles.progressBg, { backgroundColor: colors.muted }]}>
          <View style={[styles.progressFill, { width: barWidth, backgroundColor: barColor }]} />
        </View>
        <Text style={[styles.progressPct, { color: colors.foreground }]}>{item.progress}%</Text>
      </View>
    </View>
  );
}

function ListHeader({ colors, count }: { colors: ReturnType<typeof useColors>; count: number }) {
  return (
    <View style={[styles.listHeader, { borderBottomColor: colors.border }]}>
      <Text style={[styles.listHeaderLabel, { color: colors.mutedForeground }]}>PO# / BUYER</Text>
      <Text style={[styles.listHeaderRight, { color: colors.mutedForeground }]}>{count} ACTIVE</Text>
    </View>
  );
}

export default function OrdersScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : 90;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPad, backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerInner}>
          <View>
            <Text style={[styles.headerTitle, { color: colors.foreground }]}>PRODUCTION ORDERS</Text>
            <Text style={[styles.headerSub, { color: colors.mutedForeground }]}>ACTIVE — SEASON SS26</Text>
          </View>
          <View style={[styles.countBadge, { borderColor: colors.primary }]}>
            <Text style={[styles.countText, { color: colors.primary }]}>{activeOrders.length}</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={activeOrders}
        keyExtractor={(item) => item.po}
        renderItem={({ item }) => <OrderRow item={item} />}
        ListHeaderComponent={<ListHeader colors={colors} count={activeOrders.length} />}
        contentContainerStyle={{ paddingBottom: bottomPad }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={activeOrders.length > 0}
        style={{ backgroundColor: colors.background }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    borderBottomWidth: 1,
  },
  headerInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 13,
    fontFamily: "InterTight_700Bold",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  headerSub: {
    fontSize: 9,
    fontFamily: "InterTight_400Regular",
    letterSpacing: 2,
    marginTop: 2,
  },
  countBadge: {
    width: 36,
    height: 36,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  countText: {
    fontSize: 16,
    fontFamily: "JetBrainsMono_700Bold",
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderBottomWidth: 1,
  },
  listHeaderLabel: {
    fontSize: 9,
    fontFamily: "InterTight_600SemiBold",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  listHeaderRight: {
    fontSize: 9,
    fontFamily: "InterTight_600SemiBold",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  orderCard: {
    padding: 14,
    borderBottomWidth: 1,
    gap: 8,
  },
  orderTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  orderLeft: { gap: 2 },
  orderPo: {
    fontSize: 10,
    fontFamily: "JetBrainsMono_400Regular",
    letterSpacing: 0.5,
  },
  orderBuyer: {
    fontSize: 16,
    fontFamily: "InterTight_700Bold",
    letterSpacing: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 9,
    fontFamily: "InterTight_700Bold",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  orderMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  metaLabel: {
    fontSize: 8,
    fontFamily: "InterTight_600SemiBold",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  metaValue: {
    fontSize: 10,
    fontFamily: "JetBrainsMono_700Bold",
  },
  metaDivider: {
    fontSize: 10,
    opacity: 0.3,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  progressBg: {
    flex: 1,
    height: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
  },
  progressPct: {
    fontSize: 10,
    fontFamily: "JetBrainsMono_700Bold",
    width: 30,
    textAlign: "right",
  },
});
