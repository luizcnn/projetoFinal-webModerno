import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
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

  const [data, setData] = useState<RenderTree>()

  useEffect(() => {
    api.get('/categories/tree')
      .then(res => {
        res.data.forEach((node: RenderTree) => {
          setData({...node})
        })
        console.log(data)
      })
  }, [data])

  const classes = useStyles();

  const renderTree = (nodes: RenderTree) => (
    <TreeItem key={nodes.id} nodeId={`${nodes.id}`} label={nodes.name}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
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