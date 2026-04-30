import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  DimensionValue,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useColors } from "@/hooks/useColors";

const modules = [
  {
    id: "store",
    label: "STORE",
    efficiency: 95,
    wip: "18,200 m",
    status: "NOMINAL",
    detail: "Fabric stock",
    icon: "warehouse" as const,
    alert: false,
  },
  {
    id: "cutting",
    label: "CUTTING",
    efficiency: 88,
    wip: "3,400 pcs",
    status: "NOMINAL",
    detail: "8 tickets active",
    icon: "content-cut" as const,
    alert: false,
  },
  {
    id: "sewing",
    label: "SEWING",
    efficiency: 72,
    wip: "5,200 pcs",
    status: "BOTTLENECK",
    detail: "Line 3 down",
    icon: "needle" as const,
    alert: true,
  },
  {
    id: "wash",
    label: "WASH",
    efficiency: 85,
    wip: "2,800 pcs",
    status: "NOMINAL",
    detail: "4 machines running",
    icon: "water" as const,
    alert: false,
  },
  {
    id: "quality",
    label: "QC",
    efficiency: 91,
    wip: "1,900 pcs",
    status: "NOMINAL",
    detail: "FPY: 94.1%",
    icon: "clipboard-check" as const,
    alert: false,
  },
  {
    id: "finishing",
    label: "FINISHING",
    efficiency: 90,
    wip: "2,100 pcs",
    status: "NOMINAL",
    detail: "Pressing + packing",
    icon: "package-variant" as const,
    alert: false,
  },
  {
    id: "merchandising",
    label: "MERCH",
    efficiency: 96,
    wip: "12 styles",
    status: "NOMINAL",
    detail: "Buyer orders",
    icon: "briefcase" as const,
    alert: false,
  },
  {
    id: "shipment",
    label: "SHIP",
    efficiency: 94,
    wip: "3 containers",
    status: "NOMINAL",
    detail: "1 dispatch today",
    icon: "truck-fast" as const,
    alert: false,
  },
];

type ModuleCardProps = typeof modules[0];

function ModuleCard({ label, efficiency, wip, status, detail, icon, alert }: ModuleCardProps) {
  const colors = useColors();
  const statusColor = alert ? colors.accent : colors.secondary;
  const barColor = alert ? colors.accent : colors.secondary;
  const barWidth: DimensionValue = `${efficiency}%`;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <TouchableOpacity
      style={[styles.moduleCard, { backgroundColor: colors.card, borderColor: alert ? colors.accent : colors.border }]}
      onPress={handlePress}
      activeOpacity={0.75}
    >
      <View style={styles.moduleHeader}>
        <MaterialCommunityIcons name={icon} size={18} color={statusColor} />
        {alert && (
          <View style={[styles.alertDot, { backgroundColor: colors.accent }]} />
        )}
      </View>
      <Text style={[styles.moduleLabel, { color: colors.foreground }]}>{label}</Text>
      <Text style={[styles.moduleStatus, { color: statusColor }]}>{status}</Text>

      <View style={[styles.effBarBg, { backgroundColor: colors.muted, marginTop: 8 }]}>
        <View style={[styles.effBarFill, { width: barWidth, backgroundColor: barColor }]} />
      </View>
      <Text style={[styles.effPct, { color: alert ? colors.accent : colors.foreground }]}>{efficiency}%</Text>

      <View style={[styles.moduleFooter, { borderTopColor: colors.border }]}>
        <Text style={[styles.moduleWip, { color: colors.mutedForeground }]}>WIP</Text>
        <Text style={[styles.moduleWipVal, { color: colors.foreground }]}>{wip}</Text>
      </View>
      <Text style={[styles.moduleDetail, { color: colors.mutedForeground }]}>{detail}</Text>
    </TouchableOpacity>
  );
}

export default function ModulesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : 90;

  const alertCount = modules.filter((m) => m.alert).length;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPad, backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerInner}>
          <View>
            <Text style={[styles.headerTitle, { color: colors.foreground }]}>PRODUCTION MODULES</Text>
            <Text style={[styles.headerSub, { color: colors.mutedForeground }]}>STORE → SHIPMENT</Text>
          </View>
          {alertCount > 0 && (
            <View style={[styles.alertBadge, { backgroundColor: colors.accent }]}>
              <Text style={[styles.alertBadgeText, { color: colors.accentForeground }]}>{alertCount} ALERT</Text>
            </View>
          )}
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.grid, { paddingBottom: bottomPad, gap: 1, backgroundColor: colors.border }]}
        showsVerticalScrollIndicator={false}
      >
        {modules.map((mod) => (
          <ModuleCard key={mod.id} {...mod} />
        ))}
      </ScrollView>
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
  alertBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  alertBadgeText: {
    fontSize: 9,
    fontFamily: "InterTight_700Bold",
    letterSpacing: 1,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  moduleCard: {
    width: "50%",
    padding: 14,
    minHeight: 140,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopColor: "transparent",
  },
  moduleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  alertDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  moduleLabel: {
    fontSize: 11,
    fontFamily: "InterTight_700Bold",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  moduleStatus: {
    fontSize: 8,
    fontFamily: "InterTight_600SemiBold",
    letterSpacing: 1,
    marginTop: 2,
  },
  effBarBg: {
    height: 4,
    overflow: "hidden",
  },
  effBarFill: {
    height: "100%",
  },
  effPct: {
    fontSize: 18,
    fontFamily: "JetBrainsMono_700Bold",
    marginTop: 4,
  },
  moduleFooter: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    borderTopWidth: 1,
    marginTop: 8,
    paddingTop: 6,
  },
  moduleWip: {
    fontSize: 8,
    fontFamily: "InterTight_600SemiBold",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  moduleWipVal: {
    fontSize: 10,
    fontFamily: "JetBrainsMono_700Bold",
  },
  moduleDetail: {
    fontSize: 9,
    fontFamily: "InterTight_400Regular",
    marginTop: 3,
  },
});
