import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  VictoryPie,
  VictoryChart,
  VictoryCandlestick,
  VictoryLine,
  VictoryBoxPlot,
} from 'victory-native';
import { colors, fonts } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleView: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 5,
    backgroundColor: colors.white,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: colors.primaryGradientStart,
    fontSize: 18,
    fontFamily: fonts.primaryBold,
  },
  background: {
    backgroundColor: '#f1f1f8',
    flex: 1,
    paddingHorizontal: 20,
  },
  chartView: {
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: colors.white,
    padding: 10,
  },
  chartLabelText: {
    color: '#686868',
    fontFamily: fonts.primaryBold,
    fontSize: 18,
  },
});

export default function ReportDetailScreen({ navigation, reports }) {
  //if (!props.data && props.isLoading) {
  //  return (
  //    <View style={styles.loaderContainer}>
  //      <ActivityIndicator animating size="large" />
  //    </View>
  //  );
  //}

  const { originalSoldVsExtensionSold, lessonsTaughtVsLessonsSold, submitted_weeks } = navigation.state.params;
  const reportsInAscendingOrder = ([...reports]).reverse().filter(report => report.submitted_weeks <= submitted_weeks);
  const originalSoldVsExtensionSoldPieData = [
    {
      x: 'Extension',
      y: originalSoldVsExtensionSold / (originalSoldVsExtensionSold + 1),
    },
    {
      x: 'Original',
      y: 1 / (originalSoldVsExtensionSold + 1),
    },
  ];
  const lessonsTaughtVsLessonsSoldPieData = [
    {
      x: 'Taught',
      y: lessonsTaughtVsLessonsSold / (lessonsTaughtVsLessonsSold + 1),
    },
    {
      x: 'Sold',
      y: 1 / (lessonsTaughtVsLessonsSold + 1),
    },
  ];

  const miscellaneousVsGrossLineData = reportsInAscendingOrder.map(report => ({ x: report.submitted_weeks, y: report.miscellaneousVsGross }));
  const bookedVsContactedLineData = reportsInAscendingOrder.map(report => ({ x: report.submitted_weeks, y: report.bookedVsContact }));
  const showedVsOriginalSoldLineData = reportsInAscendingOrder.map(report => ({ x: report.submitted_weeks, y: report.showedVsOriginalSold}));
  const extensionSoldLineData = reportsInAscendingOrder.map(report => ({ x: report.submitted_weeks, y: report.extension_sold}));
  const weeklyLessonsSoldLineData = reportsInAscendingOrder.map(report => ({ x: report.submitted_weeks, y: report.weeklyLessonsSold}));

  return (
    <ScrollView style={styles.container} bounces={false}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>Statistics</Text>
      </View>

      <View style={styles.background}>
        <View style={styles.chartView}>
          <Text style={styles.chartLabelText}>Original Sold vs Extension Sold</Text>
          <VictoryPie
            width={290}
            height={290}
            data={originalSoldVsExtensionSoldPieData}
            colorScale={[
              '#f6b24e',
              '#19e7f7',
            ]}
            innerRadius={0}
            labelRadius={45}
            padAngle={1}
            style={{ labels: { fill: colors.white, fontSize: 18 } }}
          />
        </View>

        <View style={styles.chartView}>
          <Text style={styles.chartLabelText}>PVT vs Lessons Sold</Text>
          <VictoryPie
            width={290}
            height={290}
            data={lessonsTaughtVsLessonsSoldPieData}
            colorScale={[
              '#f6b24e',
              '#19e7f7',
            ]}
            innerRadius={0}
            labelRadius={25}
            padAngle={1}
            style={{ labels: { fill: colors.white, fontSize: 18 } }}
          />
        </View>

        <View style={[styles.chartView, { marginBottom: 20 }]}>
          <Text style={styles.chartLabelText}>Miscellaneous vs Gross</Text>
          <VictoryChart width={290} height={290}>
            <VictoryLine
              data={miscellaneousVsGrossLineData}
              style={{ data: { stroke: colors.primaryGradientStart } }}
            />
          </VictoryChart>
        </View>

        <View style={[styles.chartView, { marginBottom: 20 }]}>
          <Text style={styles.chartLabelText}>Booked vs Contacted</Text>
          <VictoryChart width={290} height={290}>
            <VictoryLine
              data={bookedVsContactedLineData}
              style={{ data: { stroke: colors.primaryGradientStart } }}
            />
          </VictoryChart>
        </View>

        <View style={[styles.chartView, { marginBottom: 20 }]}>
          <Text style={styles.chartLabelText}>Extension Sold</Text>
          <VictoryChart width={290} height={290}>
            <VictoryLine
              data={showedVsOriginalSoldLineData}
              style={{ data: { stroke: colors.primaryGradientStart } }}
            />
          </VictoryChart>
        </View>

        <View style={[styles.chartView, { marginBottom: 20 }]}>
          <Text style={styles.chartLabelText}>Original vs Original Sold</Text>
          <VictoryChart width={290} height={290}>
            <VictoryLine
              data={extensionSoldLineData}
              style={{ data: { stroke: colors.primaryGradientStart } }}
            />
          </VictoryChart>
        </View>

        <View style={[styles.chartView, { marginBottom: 20 }]}>
          <Text style={styles.chartLabelText}>Weekly Lessons Sold</Text>
          <VictoryChart width={290} height={290}>
            <VictoryLine
              data={weeklyLessonsSoldLineData}
              style={{ data: { stroke: colors.primaryGradientStart } }}
            />
          </VictoryChart>
        </View>
      </View>
    </ScrollView>
  );
}
