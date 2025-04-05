import React from 'react';
import DeckGL from '@deck.gl/react';
import { H3HexagonLayer } from '@deck.gl/geo-layers';
import { Map } from 'react-map-gl/mapbox';
import { Box } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { PickingInfo } from '@deck.gl/core';
import {MapViewState} from '@deck.gl/core';
import r7_data from '../store/taipei-h_cnt-p_cnt.json'


type properties={
  "row": string
  "value":string
}
type detail={
  "family":string
  "qualifier":string
  "timestamp": string
  "properties":properties[]
}

type raw_data={
  "demographic-h_cnt-1721210079111": detail
}

function MapApp() {

  const INITIAL_VIEW_STATE: MapViewState = {
    longitude: 121.53557572317938,
    latitude: 25.04976252389994,
    zoom: 8
  };
  
  

  const [data, setData] = React.useState<properties[]>([]);
  

  React.useEffect(() => {
    setData(r7_data['demographic-h_cnt-1721210079111']['properties'])
  }, []);

  const maxValue = Math.max(...data.map(d => Number(d.value))); // 計算數據中的最大值

  const layer = new H3HexagonLayer<properties>({
    id: 'H3HexagonLayer',
    data: data,
    extruded: true,
    getHexagon: (d: properties) => d.row,
    getFillColor: (d: properties) => [255, (1-Number(d.value)/maxValue)*255, 0,200],
    getElevation: (d: properties) =>(Number(d.value) / maxValue) *500,
    elevationScale: 20,
    pickable: true,
  });

  if (!data.length) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        height: '500px',
        width: '100%',
        borderRadius: '15px',
        backgroundColor: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <DeckGL

        initialViewState={INITIAL_VIEW_STATE}
        controller
        getTooltip={({ object }: PickingInfo<properties>) =>
          object ? { text: `${object.row} count: ${object.value}` } : null
        }
        layers={[layer]}
      >
        <Map
          mapStyle="mapbox://styles/mapbox/light-v10" // 更新為 v10
          mapboxAccessToken="pk.eyJ1IjoicGlhb3BpYW9lbiIsImEiOiJjbG1rNnRwbW4wOW5hMnFsOHA5NmFqbmplIn0.FAgoDYf2hkIJArmTirngDg" // 替換為有效 token
          // initialViewState={{
          //   longitude: -122.4034,
          //   latitude: 37.7845,
          //   zoom: 15.5,
          //   bearing: 20,
          //   pitch: 60
          //   }} // 同步視圖狀態
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0, // 確保地圖在底層
          }}
        />
      </DeckGL>
    </Box>
  );
}

export default MapApp;