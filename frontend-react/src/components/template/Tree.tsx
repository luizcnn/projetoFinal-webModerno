import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import axios from 'axios'

import api from '../../services/api';

interface RenderTree {
  id: number;
  name: string;
  parentId?: number
  children?: RenderTree[];
}

const useStyles = makeStyles({
  root: {
    height: '100%',
    flexGrow: 1,
    maxWidth: 400,
    
  },
});

export default function Tree() {

  const [data, setData] = useState<RenderTree[]>([])

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const loadTree = () => {
      try {
        api.get('/categories/tree', { cancelToken: source.token })
        .then(res => {
          setData([...res.data])
        })
      } catch(error) {
        if(axios.isCancel(error)) {
          console.log("Cancelado")
        } else {
          throw error
        }
      }
    }

    loadTree()
    return () => {
      source.cancel();
    }

  }, [])

  const classes = useStyles();

  const renderTree = (nodes: RenderTree[]) => (
    nodes.map((node: RenderTree) => {
      return (
      <TreeItem key={node.id} nodeId={`${node.id}`} label={node.name}>
        {Array.isArray(node.children) ? renderTree(node.children)  : null}
      </TreeItem>
      )
    })
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<FaChevronDown />}
      defaultExpanded={['root']}
      defaultExpandIcon={<FaChevronRight />}
    >
      {data && renderTree(data)}
    </TreeView>
  );
}