import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  DimensionValue,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";

const kpis = [
  { label: "Daily Output", value: "2,847", unit: "pcs", trend: "up" as const, subtext: "Target: 3,000", alert: false },
  { label: "OT Cost MTD", value: "$18.4K", unit: "", trend: "up" as const, subtext: "Budget: $15K", alert: true },
  { label: "Fabric Util.", value: "87.3", unit: "%", trend: "down" as const, subtext: "Target: 90%", alert: false },
  { label: "First Pass Yield", value: "94.1", unit: "%", trend: "flat" as const, subtext: "QA: 95%", alert: true },
  { label: "WIP Inventory", value: "12,450", unit: "pcs", trend: "flat" as const, subtext: "6 modules", alert: false },
  { label: "On-Time Ship", value: "91.2", unit: "%", trend: "flat" as const, subtext: "Target: 95%", alert: false },
];

const efficiencyData = [
  { label: "STORE", value: 95 },
  { label: "CUTTING", value: 88 },
  { label: "SEWING", value: 72, alert: true },
  { label: "WASH", value: 85 },
  { label: "FINISHING", value: 90 },
  { label: "SHIP", value: 94 },
];

function LiveClock() {
  const colors = useColors();
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Text style={[styles.clockText, { color: colors.mutedForeground }]}>
      {time}
    </Text>
  );
}

function TrendIcon({ trend, alert }: { trend: "up" | "down" | "flat"; alert: boolean }) {
  const colors = useColors();
  const color = alert ? colors.accent : colors.secondary;
  if (trend === "up") return <Feather name="trending-up" size={12} color={color} />;
  if (trend === "down") return <Feather name="trending-down" size={12} color={color} />;
  return <Feather name="minus" size={12} color={color} />;
}

function KPICard({ label, value, unit, trend, subtext, alert }: typeof kpis[0]) {
  const colors = useColors();
  return (
    <View style={[styles.kpiCard, { backgroundColor: colors.card }]}>
      <View style={styles.kpiLabelRow}>
        <Text style={[styles.kpiLabel, { color: colors.mutedForeground }]}>{label.toUpperCase()}</Text>
        <TrendIcon trend={trend} alert={alert} />
      </View>
      <Text style={[styles.kpiValue, { color: alert ? colors.accent : colors.foreground }]}>
        {value}
        {unit ? <Text style={[styles.kpiUnit, { color: colors.mutedForeground }]}> {unit}</Text> : null}
      </Text>
      <Text style={[styles.kpiSubtext, { color: colors.mutedForeground }]}>{subtext}</Text>
    </View>
  );
}

function EfficiencyRow({ label, value, alert }: { label: string; value: number; alert?: boolean }) {
  const colors = useColors();
  const barColor = alert ? colors.accent : colors.secondary;
  const barWidth: DimensionValue = `${value}%`;
  return (
    <View style={styles.effRow}>
      <Text style={[styles.effLabel, { color: colors.mutedForeground }]}>{label}</Text>
      <View style={[styles.effBarBg, { backgroundColor: colors.muted }]}>
        <View style={[styles.effBarFill, { width: barWidth, backgroundColor: barColor }]} />
      </View>
      <Text style={[styles.effValue, { color: alert ? colors.accent : colors.foreground }]}>{value}%</Text>
    </View>
  );
}

export default function DashboardScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 + 84 : 90;

  const today = new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPad, backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerInner}>
          <View style={styles.brandRow}>
            <Text style={[styles.brand14, { color: colors.primary }]}>14oz</Text>
            <Text style={[styles.brandErp, { color: colors.mutedForeground }]}>ERP</Text>
          </View>
          <View style={styles.headerMeta}>
            <Text style={[styles.dateText, { color: colors.mutedForeground }]}>{today}</Text>
            <LiveClock />
          </View>
        </View>
        <Text style={[styles.sectionLabel, { color: colors.mutedForeground, borderTopColor: colors.border }]}>
          FLOOR DASHBOARD — LIVE
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: bottomPad }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.sectionHeader, { borderBottomColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>KPI OVERVIEW</Text>
        </View>

        <View style={[styles.kpiGrid, { gap: 1, backgroundColor: colors.border }]}>
          {kpis.map((kpi, i) => (
            <KPICard key={i} {...kpi} />
          ))}
        </View>

        <View style={[styles.sectionHeader, { borderBottomColor: colors.border, marginTop: 1 }]}>
          <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>LINE EFFICIENCY BY MODULE</Text>
        </View>

        <View style={[styles.effPanel, { backgroundColor: colors.card }]}>
          {efficiencyData.map((d, i) => (
            <EfficiencyRow key={i} {...d} />
          ))}
        </View>

        <View style={[styles.sectionHeader, { borderBottomColor: colors.border, marginTop: 1 }]}>
          <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>PRODUCTION FLOW</Text>
        </View>

        <View style={[styles.flowPanel, { backgroundColor: colors.card }]}>
          {["RAW FABRIC → CUT PANELS", "CUT PANELS → SEWN UNITS", "SEWN UNITS → WASHED", "WASHED → FINISHED", "FINISHED → SHIPPED"].map((flow, i) => {
            const pct = 95 - i * 8;
            const barWidth: DimensionValue = `${pct}%`;
            return (
              <View key={i} style={styles.flowRow}>
                <View style={[styles.flowBarBg, { backgroundColor: colors.muted }]}>
                  <View style={[styles.flowBarFill, { width: barWidth, backgroundColor: colors.secondary }]} />
                </View>
                <View style={styles.flowMeta}>
                  <Text style={[styles.flowLabel, { color: colors.mutedForeground }]} numberOfLines={1}>{flow}</Text>
                  <Text style={[styles.flowPct, { color: colors.foreground }]}>{pct}%</Text>
                </View>
              </View>
            );
          })}
          <View style={[styles.flowShrink, { borderTopColor: colors.border }]}>
            <Text style={[styles.flowShrinkLabel, { color: colors.mutedForeground }]}>TOTAL SHRINKAGE / WASTE</Text>
            <Text style={[styles.flowShrinkValue, { color: colors.accent }]}>4.7%</Text>
          </View>
        </View>
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
    paddingVertical: 10,
  },
  brandRow: { flexDirection: "row", alignItems: "baseline", gap: 6 },
  brand14: { fontSize: 22, fontFamily: "InterTight_800ExtraBold", letterSpacing: -0.5 },
  brandErp: { fontSize: 10, fontFamily: "InterTight_400Regular", letterSpacing: 4, textTransform: "uppercase" },
  headerMeta: { alignItems: "flex-end" },
  dateText: { fontSize: 9, fontFamily: "InterTight_400Regular", letterSpacing: 1, textTransform: "uppercase" },
  clockText: { fontSize: 13, fontFamily: "JetBrainsMono_400Regular", letterSpacing: 1, marginTop: 1 },
  sectionLabel: {
    fontSize: 9,
    fontFamily: "InterTight_600SemiBold",
    letterSpacing: 3,
    textTransform: "uppercase",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderTopWidth: 1,
  },
  sectionHeader: {
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  sectionTitle: {
    fontSize: 9,
    fontFamily: "InterTight_600SemiBold",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  kpiGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  kpiCard: {
    width: "50%",
    padding: 14,
    minHeight: 90,
  },
  kpiLabelRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 6 },
  kpiLabel: { fontSize: 8, fontFamily: "InterTight_600SemiBold", letterSpacing: 2, textTransform: "uppercase", flex: 1 },
  kpiValue: { fontSize: 22, fontFamily: "JetBrainsMono_700Bold", letterSpacing: -0.5 },
  kpiUnit: { fontSize: 11, fontFamily: "JetBrainsMono_400Regular" },
  kpiSubtext: { fontSize: 9, fontFamily: "InterTight_400Regular", marginTop: 3 },
  effPanel: {
    padding: 14,
    gap: 8,
  },
  effRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  effLabel: {
    width: 60,
    fontSize: 9,
    fontFamily: "InterTight_600SemiBold",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  effBarBg: {
    flex: 1,
    height: 6,
    overflow: "hidden",
  },
  effBarFill: {
    height: "100%",
  },
  effValue: {
    width: 32,
    fontSize: 11,
    fontFamily: "JetBrainsMono_700Bold",
    textAlign: "right",
  },
  flowPanel: {
    padding: 14,
    gap: 6,
  },
  flowRow: { gap: 4 },
  flowBarBg: { height: 10, overflow: "hidden" },
  flowBarFill: { height: "100%" },
  flowMeta: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 2 },
  flowLabel: { fontSize: 8, fontFamily: "InterTight_400Regular", flex: 1 },
  flowPct: { fontSize: 10, fontFamily: "JetBrainsMono_700Bold" },
  flowShrink: { flexDirection: "row", justifyContent: "space-between", marginTop: 4, paddingTop: 8, borderTopWidth: 1 },
  flowShrinkLabel: { fontSize: 9, fontFamily: "InterTight_400Regular", letterSpacing: 1, textTransform: "uppercase" },
  flowShrinkValue: { fontSize: 11, fontFamily: "JetBrainsMono_700Bold" },
});
