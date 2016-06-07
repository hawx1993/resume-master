/**
 * Created by trigkit4 on 16/6/6.
 */

var lastListPos = $(".experience ul li:eq(-1)").offset().top;//510
var projectNamePos = $(".project_name")[0].offsetTop;//355

var gapHeight = lastListPos -  projectNamePos;

var internExper = $('#column3')[0];
internExper.style.marginTop = gapHeight + 47 + 'px';

var internDesc = $('.intern_column')[0];
internDesc.style.marginTop = gapHeight + 60 + 'px';

//掌握技能定位
var internLastlist = $(".intern_column ul li:eq(-1)").offset().top;
var internDescTop = internDesc.offsetTop;
var internListHeight = internLastlist - internDescTop;
var masterSkillBar = $("#column4")[0];
masterSkillBar.style.marginTop = internListHeight -12 + "px";

//自我描述定位
var skillLastlist = $(".skill ul li:eq(-1)").offset().top;
var skillDesc = $(".skill_desc")[0].offsetTop;
var skillGapHeight = skillLastlist - skillDesc;

var column5 = $("#column5")[0];
column5.style.marginTop = skillGapHeight  + "px";

var descHead = $(".desc_header")[0];
descHead.style.marginTop = skillGapHeight +44+ "px";

